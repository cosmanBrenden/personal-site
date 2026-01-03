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
// { id: 0, title: 'Lorem ipsum 0', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' , date: 1691622800},
//     { id: 1, title: 'Lorem ipsum 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly', date: 1691622800-1 },
//     { id: 2, title: 'Lorem ipsum 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly', date: 1691622800-2 },
//     { id: 3, title: 'Lorem ipsum 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly', date: 1691622800-3 },
//     { id: 4, title: 'Lorem ipsum 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly', date: 1691622800-4 },
//     { id: 5, title: 'Lorem ipsum 5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly', date: 1691622800-5 },
//     { id: 6, title: 'Lorem ipsum 6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly', date: 1691622800-6 },
//     { id: 7, title: 'Lorem ipsum 7', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly', date: 1691622800-7 },
//     { id: 8, title: 'Lorem ipsum 8', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly', date: 1691622800-8 },
//     { id: 9, title: 'Lorem ipsum 9', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly', date: 1691622800-9 },
//     { id: 10, title: 'Lorem ipsum 10', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly', date: 1691622800-10 },
//     { id: 11, title: 'Lorem ipsum 11', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly', date: 1691622800-11 },
//     { id: 12, title: 'Lorem ipsum 12', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly', date: 1691622800-12 },
  
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
    setSearchText(barText)
    getBlogsByTags(searchText).then(result => {
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
      {/* {showSortMenu ? <SortMenu
      />: null} */}

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
