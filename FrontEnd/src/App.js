import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import LandingPage from './components/LandingPage';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import TVStaticFilter from './components/TVStaticFilter';
import './App.css';
import LoadingWindow from './components/LoadingWindow';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [videoURL, setVideoURL] = useState("/api/background");
  const [videoTag, setVideoTag] = useState(null);

  useEffect(() => {
    const videoElement = document.createElement('video');
    videoElement.src = videoURL;
    videoElement.preload = 'auto';
    
    // When video metadata is loaded (enough to know dimensions/duration)
    videoElement.onloadeddata = () => {
      setIsLoading(false);
    };
    
    // Fallback in case onloadeddata doesn't fire
    videoElement.oncanplaythrough = () => {
      setIsLoading(false);
    };
    
    // Error handling
    videoElement.onerror = () => {
      console.error('Failed to load background video');
      setIsLoading(false); // Stop loading even if video fails
    };
    
    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 second timeout

    setVideoTag(
      <video
        key="background-video"
        autoPlay
        loop
        muted
        playsInline
        className='background-image'
        src={videoURL}
        onLoadedData={() => setIsLoading(false)}
        onCanPlayThrough={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        alt=""
      />
    );

    return () => clearTimeout(timeoutId);
  }, [videoURL]);

  return (
    <Router>
      <div className="app">
        {isLoading ? (
          <LoadingWindow/>
        ) : (
          <>
            {videoTag}
            <TVStaticFilter/>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/blog-list" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/:whatever" element={<>fart</>}/>
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;