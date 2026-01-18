import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import LandingPage from './components/LandingPage';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import TVStaticFilter from './components/TVStaticFilter';
import './App.css';
import LoadingWindow from './components/LoadingWindow';
import HomeButton from './components/HomeButton';
import FallbackPage from './components/FallbackPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [videoURL, setVideoURL] = useState("/api/background");
  const [videoTag, setVideoTag] = useState(null);

  const [postCache, setPostCache] = useState(new Map())
  const [postReads, setPostReads] = useState(new Map())
  const [titleCache, setTitleCache] = useState(new Map())
  const [tagCache, setTagCache] = useState(new Map())
  const [palette, setPalette] = useState("green");

  const maxCache = 5;

  useEffect(() => {

    if(Math.floor(Math.random() * 2) === 1){
      setPalette("amber")
    }
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

  const handleAddToCache = (keyToAdd, valueToAdd, titleToAdd, tagToAdd) => {
    if(postCache.size >= maxCache){
      let smallestKey = Array.from(postCache.keys())[0]
      let LRU = postCache.get(smallestKey);
      postCache.forEach((value, key) => {
        if(value < LRU){
          smallestKey = key;
          LRU = value;
        }
      })
      postCache.delete(smallestKey)
      postReads.delete(smallestKey)
      titleCache.delete(smallestKey)
      tagCache.delete(smallestKey)
    }
    postCache.set(keyToAdd, valueToAdd)
    postReads.set(keyToAdd, 1)
    titleCache.set(keyToAdd, titleToAdd)
    tagCache.set(keyToAdd, tagToAdd)
  }

  const handleReadFromCache = (key) => {
    let keyInCache = postCache.get(key) !== undefined
    if(keyInCache){
      let newCount = postReads.get(key)
      newCount = newCount + 1
      postReads.set(key, newCount)
    }
    return [postCache.get(key), titleCache.get(key), tagCache.get(key)]
  }

  return (
    <Router>
      <div className={`app ${palette}`}>
        {isLoading ? (
          <LoadingWindow/>
        ) : (
          <>
            {videoTag}
            <TVStaticFilter/>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/blog-list" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetail add={handleAddToCache} read={handleReadFromCache}/>} />
              <Route path="*" element={<FallbackPage/>}/>
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;