import { Button, Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Quotes from './Quotes';
import Chat from './Chat';
import AuthForm from './AuthForm';


function App() {
  return (
    <Router>
      <div>
        <h1 className='head'>Цитатник</h1>
        <Routes>
          <Route path="/" element={<Quotes />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
