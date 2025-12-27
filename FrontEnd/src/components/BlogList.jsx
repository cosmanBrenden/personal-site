import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogTile from './BlogTile';
import './BlogList.css';

const BlogList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const blogPosts = [
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
      {/* <img 
        className="blog-list-background" 
        src="https://api.builder.io/api/v1/image/assets/TEMP/824d82dc41bf77d539c48199e521c1c3a5d13018?width=3840" 
        alt="" 
      /> */}

      <div className="search-bar-container">
        <svg className="search-bar-glow" width="1497" height="354" viewBox="0 0 1497 354" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_df_search)">
            <ellipse cx="748.5" cy="75" rx="548.5" ry="75" fill="#011E2C"/>
          </g>
          <defs>
            <filter id="filter0_df_search" x="0" y="-196" width="1497" height="550" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="100" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_search"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="50"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_search"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_search" result="shape"/>
              <feGaussianBlur stdDeviation="15" result="effect2_foregroundBlur_search"/>
            </filter>
          </defs>
        </svg>
        
        <div className="search-input-wrapper">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Tags_" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <span className="search-icon">#</span>
        </div>
      </div>

      <div className="blog-grid-container">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <BlogTile 
              key={post.id} 
              post={post} 
              onClick={() => navigate(`/blog/${post.id}`)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
