import React, { useState } from 'react';

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const apiKey = 'your_api_key';
  const url = 'wss://ke7cqp0zw6.execute-api.us-west-1.amazonaws.com/websocket-tf-dev-stage'

  const handleConnect = () => {
    if (!socket) {
      // Connect to WebSocket API
      const newSocket = new WebSocket(`${url}/?api_key=${apiKey}`);

      newSocket.onopen = () => {
        setSocket(newSocket);
        setConnected(true);
      };

      newSocket.onmessage = (event) => {
        setMessages((prevMessages) => [...prevMessages, { text: event.data, type: 'received' }]);
      };

      newSocket.onclose = () => {
        setSocket(null);
        setConnected(false);
      };
    }
  };

  const handleDisconnect = () => {
    if (socket) {
      socket.close();
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (socket && message.trim() !== '') {
      socket.send(message);
      setMessages((prevMessages) => [...prevMessages, { text: message, type: 'sent' }]);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      {!connected ? (
        <div>
          <button onClick={handleConnect}>Connect</button>
        </div>
      ) : (
        <div>
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
            onChange={handleMessageChange}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
