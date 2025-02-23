// Chat.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../AxiosInstance";
import createWebSocket from "./websocket";
import getFormattedDate from "../../utils/getFormattedDate";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const chatLogRef = useRef(null);
  const { roomId } = useParams();
  const chatSocketRef = useRef(null);
  const inputRef = useRef();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await Api.get(`http://127.0.0.1:8000/api/rooms/${roomId}/messages/`);
        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to fetch messages");
      }
    };
    fetchMessages();
  }, [roomId]);

  const handleSendMessage = () => {
    const message = inputRef.current.value;
    if (message.trim() && profile) {
      chatSocketRef.current.send(
        JSON.stringify({ message: message, profile: profile })
      );
      inputRef.current.value = "";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await Api.get("/api/profile/");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (accessToken) {
      fetchProfile();
    }

    const chatSocket = createWebSocket(
      roomId,
      accessToken,
      (data) => {
        if (data.message && data.message.trim()) {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      },
      (error) => setError("WebSocket error"),
      (e) => console.error("Chat socket closed unexpectedly", e)
    );
    chatSocketRef.current = chatSocket;

    return () => {
      chatSocket.close();
    };
  }, [roomId, accessToken]);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col  h-[calc(100vh-74px)] max-w-4xl mx-auto bg-base-100">
      <div className="navbar bg-base-300 rounded-lg m-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold px-4">Chat Room</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-2">
        <div className="bg-base-200 shadow-xl rounded-box p-4 h-full flex flex-col">
          <div
            id="chat-log"
            ref={chatLogRef}
            className="flex-1 overflow-y-auto space-y-4 p-2"
          >
            {error && <div className="alert alert-error">{error}</div>}
            {messages.map((message, index) => (
              message.profile && (
                <div
                  key={index}
                  className={`chat ${message.profile.id === profile?.id ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={message.profile.icon}
                        alt="Profile Icon"
                        className="bg-base-300"
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {message.profile.id === profile?.id ? (
                      <>
                        <time className="text-xs opacity-50">
                          {getFormattedDate(message.created_on)}
                        </time>
                        <a
                          href={`/profile/${message.profile.id}`}
                          className="font-bold ml-2 hover:underline"
                        >
                          {message.profile.name}
                        </a>
                      </>
                    ) : (
                      <>
                        <a
                          href={`/profile/${message.profile.id}`}
                          className="font-bold hover:underline"
                        >
                          {message.profile.name}
                        </a>
                        <time className="text-xs opacity-50 ml-2">
                          {getFormattedDate(message.created_on)}
                        </time>
                      </>
                    )}
                  </div>
                  <div
                    className={`chat-bubble ${
                      message.profile.id === profile?.id
                        ? "chat-bubble-primary"
                        : "chat-bubble-secondary"
                    }`}
                  >
                    {message.message}
                  </div>
                  <div className="chat-footer opacity-50 text-xs mt-1">
                    Delivered
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      <div className="bg-base-200 p-4 sticky bottom-0 w-full border-t border-base-300">
        <div className="flex gap-2">
          <input
            id="chat-message-input"
            type="text"
            ref={inputRef}
            className="input input-bordered flex-1 focus:outline-none focus:border-primary"
            placeholder="Type a message..."
            onKeyDown={handleKeyPress}
          />
          <button
            id="chat-message-submit"
            onClick={handleSendMessage}
            className="btn btn-primary gap-2"
          >
            Send
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l7-1.5a1 1 0 00.242-.051l3.76-1.769a1 1 0 00-.454-1.931L9.414 16.5l3.057-1.797a1 1 0 00-.532-1.808l-4-1-2.573-1.293a1 1 0 01.684-1.881l10 4.75a1 1 0 001.048-.199l2-2a1 1 0 00-1.414-1.414l-1.486 1.485-8.267-3.944 4.352-8.703z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;