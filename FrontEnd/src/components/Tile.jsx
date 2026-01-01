import React, { useState } from 'react';
import { useEffect } from 'react';
import './Tile.css';

function changeCSS(className, rule) {
  // Create style element if it doesn't exist
  let style = document.querySelector('#dynamic-styles');
  if (!style) {
    style = document.createElement('style');
    style.id = 'dynamic-styles';
    document.head.appendChild(style);
  }
  
  // Add the rule
  style.sheet.insertRule(`${className} { ${rule} }`, style.sheet.cssRules.length);
}


const Tile = ({ post, clickFunc=null, height="384px", maxWidth="384px", fixedWidth=false, shouldGrow=true }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  
  useEffect(() => {
    if(fixedWidth){
      changeCSS(".blog-tile", `width: ${maxWidth};`);
    }
    else{
      changeCSS(".blog-tile", `max-width: ${maxWidth};`);
    }
    changeCSS(".blog-tile", `height: ${height};`);
    console.log(`height: ${height}`)
    if(!shouldGrow){
      changeCSS(".blog-tile:hover", "transform: scale(1);")
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

    if(clickFunc !== null){
      console.log("i have a func!!")
      setIsClickable(true);
    }
  }, []);
  return (
    <>
  
      <div className="blog-tile" onClick={clickFunc}>
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
