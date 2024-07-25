import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../AxiosInstance";

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
    if (message.trim() && profile) { // Check if profile is available
      chatSocketRef.current.send(
        JSON.stringify({ message: message, profile: profile })
      );
      inputRef.current.value = "";
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

    // Create WebSocket connection
    const chatSocket = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${roomId}/?token=${accessToken}`
    );
    chatSocketRef.current = chatSocket; // Store WebSocket instance in ref

    chatSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    chatSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log("Received data:", data);

      if (data.message && data.message.trim()) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    chatSocket.onclose = function (e) {
      console.error("Chat socket closed unexpectedly", e);
    };

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      chatSocket.close();
    };
  }, [roomId, accessToken]);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col">
          <div
            id="chat-log"
            ref={chatLogRef}
            className="flex-1 overflow-y-auto mb-4 p-2 border border-gray-300 rounded-lg bg-gray-50"
          >
            {error && <div className="text-red-500">{error}</div>}
            {messages.map((message, index) => (
              message.profile && ( // Check if profile exists
                <div key={index} className={`p-2 mb-2 rounded-lg`}>
                  <div className="flex items-center">
                    <img
                      src={message.profile.icon}
                      alt="Profile Icon"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <a
                      href={`/profile/${message.profile.id}`}
                      className="font-bold"
                    >
                      {message.profile.name}
                    </a>
                  </div>
                  <div>{message.message}</div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-300 p-4">
        <div className="flex">
          <input
            id="chat-message-input"
            type="text"
            ref={inputRef}
            className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
            placeholder="Type a message..."
          />
          <button
            id="chat-message-submit"
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-lg p-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
