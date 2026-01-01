import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import LandingPage from './components/LandingPage';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import TVStaticFilter from './components/TVStaticFilter';
import './App.css';




function App() {
  const [videoURL, setVideoURL] = useState("https://www.w3schools.com/howto/rain.mp4");

  useEffect(() => {
    let rand = Math.floor(Math.random() * 2);
    if(rand === 1){
      setVideoURL("https://upload.wikimedia.org/wikipedia/commons/transcoded/c/ca/043_Greater_flamingo_vocalizing_in_the_Camargue_during_mating_season_%28slow_motion%29_Video_by_Giles_Laurent.webm/043_Greater_flamingo_vocalizing_in_the_Camargue_during_mating_season_%28slow_motion%29_Video_by_Giles_Laurent.webm.720p.vp9.webm");
    }
  }, []);

  return (
    <Router>
      <div className="app">
        
        <video
        autoPlay
        loop
        muted
        className='background-image'
        src={videoURL}
        alt=""
        />
      
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
        </Routes>
    </div>
    </Router>
  );
}

export default App;
