import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tile from './Tile';
import SearchBar from './SearchBar';
import './BlogList.css';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import HomeIcon from '@mui/icons-material/Home';

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

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    let tags = urlParams.get('tags');
    if(!tags){
      tags = ""
    }
    setSearchText(tags);
    setBarText(tags);
    getBlogsByTags(tags).then(result => {
      setBlogPosts(result)
    })
    handleSort();
    
    setIsInit(true);
  }, [])

  useEffect(() => {
    handleSort();
  }, [sortByTitle]);

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

  const handleSearch = () => {
    const newSearchText = barText.replaceAll(" ", ""); // Get the current value from barText
    setSearchText(newSearchText); // Update searchText state
    
    // Use newSearchText instead of searchText
    getBlogsByTags(newSearchText).then(result => {
      setBlogPosts(result)
    })
  };
 
  const handleKeyPress = (e) => {
    // Check if the pressed key is 'Enter'
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortToggle = (opt) => {
    setSortByTitle(opt);
  }

  const handleRevToggle = () => {
    setShouldReverse(!shouldReverse);
    handleReverse();
  }

  const handleReverse = () => {
    let blogs = [...blogPosts]
    blogs.reverse();
    setBlogPosts([...blogs]);
  }

  const handleSort = () => {
    let blogs = [...blogPosts];
    setShouldReverse(false);
    if(sortByTitle){
      console.log("Sorting by title");
      blogs = blogs.sort((a,b) => a.title.localeCompare(b.title));
    }
    else{
      console.log("sorting by date")
      blogs = blogs.sort((a,b) => a.date < b.date);
    }
    setBlogPosts([...blogs]);
  }

  return (
    <div className="blog-list-page">
      <div className='home-button-wrapper' onClick={() => navigate("/")}><HomeIcon className='home-button'/></div>
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

      <div className="blog-grid-container">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <Tile 
              key={post.id} 
              post={post}
              shouldGrow={true}
              clickFunc={() => navigate(`/blog/${post.id}?callback=${window.location.search}`)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
