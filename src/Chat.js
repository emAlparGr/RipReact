import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

let conn;

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        conn = new WebSocket('ws://localhost:8080');

        conn.onopen = () => {
            console.log('WebSocket connection opened');
        };

        conn.onmessage = (event) => {
            const receivedMessage = event.data;
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        };

        conn.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            if (conn && conn.readyState === WebSocket.OPEN) {
                conn.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (conn && conn.readyState === WebSocket.OPEN) {
            conn.send(inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div className='chat-container'>
            <h2>Чат</h2>
            <div className='chat-messages-container'>
                {messages.map((message, index) => (
                    <div className='chat-messages' key={index}>{message}</div>
                ))}
            </div>
            <div className='chat-controls'>
                <input className='chat-input'
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <Button variant="outline-warning" onClick={sendMessage} >Отправить</Button>
                <Link to="/quotes" className="btn btn-outline-primary">Вернуться к цитатам</Link>
            </div>
        </div>
    );
}

export default Chat;
