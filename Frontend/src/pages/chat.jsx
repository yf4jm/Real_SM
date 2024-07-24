import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef(null);
  const chatLogRef = useRef(null);
  const { roomId } = useParams();
  const chatSocketRef = useRef(null); // Ref to hold WebSocket instance

  useEffect(() => {
    // Create WebSocket connection
    const chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomId}/`);
    chatSocketRef.current = chatSocket; // Store WebSocket instance in ref

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log('Received data:', data);

      if (data.type === 'id_connection') {
        console.log('ID connection:', data);
      } else if (data.message && data.message.trim()) { // Filter out empty messages
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    };

    chatSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    };

    const handleSendMessage = () => {
      const message = messageInputRef.current.value;
      if (message.trim()) {
        chatSocketRef.current.send(JSON.stringify({ 'message': message }));
        messageInputRef.current.value = '';
      }
    };

    // Add event listeners for keyup and click
    const inputField = messageInputRef.current;
    const submitButton = document.querySelector('#chat-message-submit');

    inputField.addEventListener('keyup', handleKeyUp);
    submitButton.addEventListener('click', handleSendMessage);

    return () => {
      chatSocket.close();
      inputField.removeEventListener('keyup', handleKeyUp);
      submitButton.removeEventListener('click', handleSendMessage);
    };
  }, [roomId]);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col">
          <div
            id="chat-log"
            ref={chatLogRef}
            className="flex-1 overflow-y-auto mb-4 p-2 border border-gray-300 rounded-lg bg-gray-50"
          >
            {messages.map((message, index) => (
              <div key={index} className="p-2 mb-2 bg-gray-200 rounded-lg">
                {message}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white border-t border-gray-300 p-4">
        <div className="flex">
          <input
            id="chat-message-input"
            ref={messageInputRef}
            type="text"
            className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
            placeholder="Type a message..."
          />
          <button
            id="chat-message-submit"
            onClick={() => handleSendMessage()} // Call handleSendMessage correctly
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
