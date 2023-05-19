'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import startWebSocketServer from './socket';

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Establish a WebSocket connection
    const socket = io('http://localhost:3000');
    // @ts-ignore
    setSocket(socket);

    // Listen for incoming messages
    socket.on('message', (message) => {
      // @ts-ignore
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Clean up the WebSocket connection
      socket.disconnect();
    };
  }, []);
  // @ts-ignore
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  // @ts-ignore
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (socket && inputValue) {
      // Send the message to the WebSocket server
      // @ts-ignore

      socket.emit('message', inputValue);

      // Clear the input field
      setInputValue('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <input type='text' value={inputValue} onChange={handleInputChange} />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
