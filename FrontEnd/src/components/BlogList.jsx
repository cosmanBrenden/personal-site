import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Tile from './Tile';
import SearchBar from './SearchBar';
import './BlogList.css';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import LoadingWindow from './LoadingWindow';
import HomeButton from './HomeButton';

async function getBlogsByTags(tags) {
  const res = await fetch(`/api/tags/${tags}`);
  if(!res.ok){
    throw new Error(`Response status: ${res.status}`)
  }
  const result = await res.json()
  return result
}

const BlogList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [barText, setBarText] = useState("");
  const [isInit, setIsInit] = useState(false);
  const [shouldReverse, setShouldReverse] = useState(false);
  const [sortByTitle, setSortByTitle] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numSearches, setNumSearches] = useState(0);

  // Use useMemo to sort posts based on current sorting criteria
  const sortedPosts = useMemo(() => {
    let posts = [...blogPosts];
    
    // Sort by title or date
    if (sortByTitle) {
      posts.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Sort by date - assuming date is a string in ISO format
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Reverse if needed
    if (shouldReverse) {
      posts.reverse();
    }
    
    return posts;
  }, [blogPosts, sortByTitle, shouldReverse]);

  useEffect(() => {
    setIsLoading(true); // Set loading true at start
    
    const urlParams = new URLSearchParams(window.location.search);
    let tags = urlParams.get('tags');
    if(!tags){
      tags = ""
    }
    setSearchText(tags);
    setBarText(tags);
    
    // Use functional update to ensure correct state
    setNumSearches(prev => prev + 1);
    
    getBlogsByTags(tags).then(result => {
      setBlogPosts(result);
      setNumSearches(prev => prev - 1);
      setIsLoading(false); // Set loading false after data arrives
    }).catch(error => {
      console.error('Error fetching blogs:', error);
      setNumSearches(prev => prev - 1);
      setIsLoading(false); // Also handle errors
    });
    
    setIsInit(true);
  }, [])

  useEffect(() =>{
    if(!isInit){
      return
    }

    let withoutSpaces = searchText.replaceAll(" ", "");
    if(withoutSpaces){
      navigate("/blog-list?tags=" + withoutSpaces);
    }
    else{
      navigate("/blog-list")
    }
  },[searchText, isInit])

  useEffect(() => {
    // Update loading state based on numSearches
    if (numSearches > 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [numSearches])

  const handleSearch = () => {
    setIsLoading(true); // Set loading true immediately
    setNumSearches(prev => prev + 1); // Use functional update
    const newSearchText = barText.replaceAll(" ", "");
    setSearchText(newSearchText);
    
    getBlogsByTags(newSearchText).then(result => {
      setBlogPosts(result);
      setNumSearches(prev => prev - 1); // Use functional update
    }).catch(error => {
      console.error('Error fetching blogs:', error);
      setNumSearches(prev => prev - 1); // Use functional update
    });
  };
 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortToggle = (opt) => {
    setSortByTitle(opt);
  }

  const handleRevToggle = () => {
    setShouldReverse(!shouldReverse);
  }

  return (
    <div className="blog-list-page">
      <HomeButton/>
      <SearchBar
        barText={barText}
        setBarText={setBarText}
        handleKeyPress={handleKeyPress}
        options ={[
          <button key={0} className={sortByTitle ? "drop-down-button-highlight" : "drop-down-button"}onClick={() => handleSortToggle(true)}><SortByAlphaIcon/></button>,
          <button key={1} className={!sortByTitle ? "drop-down-button-highlight" : "drop-down-button"} onClick={() => handleSortToggle(false)}><DateRangeIcon/></button>,
          <button key={2} className={shouldReverse ? "drop-down-button-highlight" : "drop-down-button"} onClick={() => handleRevToggle()}><SwapVertIcon/></button>
        ]}
      />

      
          {isLoading ? (
            <LoadingWindow text={"Loading Blogs..."}/>
          ) : (
            <div className="blog-grid-container">
        <div className="blog-grid">
            {sortedPosts.map((post) => (
              <Tile 
                key={post.id} 
                post={post}
                shouldGrow={true}
                clickFunc={() => navigate(`/blog/${post.id}?callback=${window.location.search}`)} 
              />
            ))}
            </div>
      </div>
          )}
        
    </div>
  );
};

export default BlogList;