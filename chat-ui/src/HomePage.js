// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Chat App</h1>
      <Link to="/chat">Go to Chat</Link>
    </div>
  );
};

export default HomePage;
