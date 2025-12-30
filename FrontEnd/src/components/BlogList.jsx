import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogTile from './BlogTile';
import SearchBar from './SearchBar';
import './BlogList.css';


const BlogList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [barText, setBarText] = useState("");
  const [isInit, setIsInit] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    let tags = urlParams.get('tags');
    if(!tags){
      tags = ""
    }
    setSearchText(tags)
    setBarText(tags)
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

  const handleSearch = () => {
    setSearchText(barText)
  };
 
  const handleKeyPress = (e) => {
    // Check if the pressed key is 'Enter'
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const blogPosts = [
    { id: 0, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
    { id: 1, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
    { id: 2, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
    { id: 3, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
    { id: 4, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
    { id: 5, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
    { id: 6, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
    { id: 7, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
    { id: 8, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
    { id: 9, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
    { id: 10, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
    { id: 11, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
    { id: 12, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' },
  ];

  return (
    <div className="blog-list-page">

      <SearchBar
        barText={barText}
        setBarText={setBarText}
        handleKeyPress={handleKeyPress}
        showSortMenu={showSortMenu}
        setShowSortMenu={setShowSortMenu}
      />

      <div className="blog-grid-container">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <BlogTile 
              key={post.id} 
              post={post} 
              onClick={() => navigate(`/blog/${post.id}?callback=${window.location.search}`)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
