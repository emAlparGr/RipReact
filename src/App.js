import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Quotes from './Quotes';
import Chat from './Chat';
import LogIn from './LogIn';
import SignUp from './SignUp';
import NavBar from './Navigation';


function App() {
  return (
    <Router>
      <div>
        <h1 className='head'>Цитатник</h1>
        <NavBar />
        <Routes>
          <Route path="/" element={<Quotes />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
