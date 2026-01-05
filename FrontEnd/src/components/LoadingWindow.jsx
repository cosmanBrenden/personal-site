import React from "react";
import './LoadingWindow.css'

const LoadingWindow = ({text="Booting..."}) => {
    return (
        <div className="loading-container">
            
              <div className="loading-text">{text}</div>
              <div className="loading-spinner"/>
            </div>
    );
}

export default LoadingWindow;