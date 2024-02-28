import React, { useState, useEffect } from 'react';

const ChatApp = () => {
  const apiKey = 'your_api_key'; // Replace 'your_api_key' with your actual API key
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (apiKey && !socket) {
      // Connect to WebSocket API
      const newSocket = new WebSocket('wss://websocket-api.com', {
        headers: {
          'x-api-key': apiKey,
        },
      });

      newSocket.onopen = () => {
        setSocket(newSocket);
      };

      newSocket.onmessage = (event) => {
        setMessages((prevMessages) => [...prevMessages, { text: event.data, type: 'received' }]);
      };

      newSocket.onclose = () => {
        setSocket(null);
      };

      return () => {
        newSocket.close();
      };
    }
  }, [apiKey, socket]);

  const handleSendMessage = () => {
    if (socket && message.trim() !== '') {
      socket.send(message);
      setMessages((prevMessages) => [...prevMessages, { text: message, type: 'sent' }]);
      setMessage('');
    }
  };

  const handleDisconnect = () => {
    if (socket) {
      socket.close();
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div style={{ textAlign: 'left' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.type === 'sent' ? 'right' : 'left' }}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
      <button onClick={handleDisconnect}>Disconnect</button>
    </div>
  );
};

export default ChatApp;
