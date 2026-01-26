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
            <div className="blog-detail-content">
                {innerContent}
            </div>
            </div>
        </div>
        </div>
    );
}

export default Window;