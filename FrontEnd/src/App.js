import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import LandingPage from './components/LandingPage';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import TVStaticFilter from './components/TVStaticFilter';
import './App.css';




function App() {
  const [videoURL, setVideoURL] = useState("/api/background");
  const [videoTag, setVideoTag] = useState()
  useEffect(() => {
    setVideoTag(<video
        autoPlay
        loop
        muted
        className='background-image'
        src={videoURL}
        alt=""
        />);
  },[])

  return (
    <Router>
      <div className="app">
        
        {/* <video
        autoPlay
        loop
        muted
        className='background-image'
        src={videoURL}
        alt=""
        /> */}
      {videoTag}      
      {/* <div class="triangle top-left"></div>
      <div class="triangle top-right"></div>
      <div class="triangle bottom-left"></div>
      <div class="triangle bottom-right"></div>
      <div className='animation'/>
      <div className='overlay'/> */}
      <TVStaticFilter/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog-list" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/:whatever" element={<>fart</>}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
