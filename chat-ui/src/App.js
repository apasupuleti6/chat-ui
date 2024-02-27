import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const webSocketURL = 'wss://jra5lrv0ne.execute-api.us-west-1.amazonaws.com/websocket-tf-dev-stage/';

  useEffect(() => {
    const ws = new WebSocket(webSocketURL);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleMessageSend = () => {
    const ws = new WebSocket(webSocketURL);
    ws.onopen = () => {
      ws.send(inputMessage);
      setInputMessage('');
    };
  };

  return (
    <div>
      <h1>WebSocket Chat App</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
}

export default App;
