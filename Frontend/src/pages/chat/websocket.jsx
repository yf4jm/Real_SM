// websocket.js
const createWebSocket = (roomId, accessToken, onMessage, onError, onClose) => {
    const chatSocket = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${roomId}/?token=${accessToken}`
    );
  
    chatSocket.onopen = () => {
      console.log("WebSocket connection established");
    };
  
    chatSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (onError) onError(error);
    };
  
    chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("Received data:", data);
  
      if (onMessage) onMessage(data);
    };
  
    chatSocket.onclose = (e) => {
      console.error("Chat socket closed unexpectedly", e);
      if (onClose) onClose(e);
    };
  
    return chatSocket;
  };
  
  export default createWebSocket;
  