import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import './App.css';



function App() {
  return (
    <Router>
      <div className="app">
        <video
        autoPlay
        loop
        muted
        className='background-image'
        src="https://www.w3schools.com/howto/rain.mp4"
        alt=""
      />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog-list" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
