import React from 'react';
import './BlogTile.css';

const BlogTile = ({ post, onClick }) => {
  return (
    <div className="blog-tile" onClick={onClick}>
      <div className="blog-tile-glow"></div>
      <div className="blog-tile-card">
        <h3 className="blog-tile-title">{post.title}</h3>
        <p className="blog-tile-description">{post.description}</p>
        <p className="blog-tile-tags">{post.tags}</p>
      </div>
    </div>
  );
};

export default BlogTile;
