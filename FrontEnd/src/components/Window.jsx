import React from "react";
import { useState, useEffect } from 'react';
import './Window.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Window = ({returnFunction, innerContent}) => {
    return(
        <div className="blog-detail-page">
        <div className='blog-detail-glow'/>
        <div className="blog-window-overlay">
            <div className="blog-window">
            <button className="back-button" onClick={returnFunction}>
                <ArrowBackIcon/>
            </button>

            {/* <h1 className="blog-detail-title">{blogTitle || "Where do you think you're going?"}</h1>
            
            <div 
                className="blog-detail-content" 
                dangerouslySetInnerHTML={{
                __html: innerHTML || fallbackHTML
                }}
            />
            <br></br>
            <br></br>
            <div className='blog-detail-content' style={{textAlign: "center"}}>tags: {blogTags}</div> */}
            {innerContent}
            </div>
        </div>
        </div>
    );
}

export default Window;