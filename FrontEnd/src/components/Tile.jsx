import React, { useState } from 'react';
import { useEffect } from 'react';
import './Tile.css';


const Tile = ({ post, clickFunc=null, height="384px", maxWidth="384px", fixedWidth=false, shouldGrow=true }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [parentStyle, setParentStyle] = useState({})
  
  useEffect(() => {
    if(fixedWidth){
      setParentStyle({
        width: maxWidth,
        height: height,
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.3s ease"
      });
    }
    else{
      setParentStyle({
        maxWidth: maxWidth,
        height: height,
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.3s ease"
      });
    }

    let hasPost = post !== undefined;
    console.log(post);
    if(hasPost){
      if(Object.hasOwn(post, "title")){
        setShowTitle(true);
      }
      if(Object.hasOwn(post, "description")){
        setShowDescription(true);
      }
      if(Object.hasOwn(post, "tags")){
        setShowTags(true);
      }
      if(Object.hasOwn(post, "date")){
        setShowDate(true);
      }
    }
  }, []);
  return (
    <>
  
      <div style={parentStyle} className="blog-tile" onClick={clickFunc}>
        <div className="blog-tile-glow"></div>
        <div className="blog-tile-card">
          {showTitle ? <h3 className="blog-tile-title">{post.title}</h3> : null}
          {showDescription ? <p className="blog-tile-description">{post.description}</p> : null}
          {showTags ? <p className="blog-tile-tags">{post.tags}</p> : null}
          {showDate ? <p className="blog-tile-tags">{new Date(post.date * 1000).toString()}</p> : null}
        </div>
      </div>
    </>
  );
};

export default Tile;
