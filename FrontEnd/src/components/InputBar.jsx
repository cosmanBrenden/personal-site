import React, { useState } from "react";
import "./InputBar.css";
import SortIcon from '@mui/icons-material/Sort';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";




const InputBar = ({barText, setBarText, handleKeyPress, options=null, cssClass="fixed-bar", placeholderText="tags_"}) => {
    const [showSortMenu, setShowSortMenu] = useState(false);  

    if(options === null){
      return(
        <div className={`search-bar-container ${cssClass}`}>
        <div className='search-bar-glow'></div>
      <div className="search-input-wrapper">
        <input 
          type="text" 
          className="search-input" 
          placeholder={placeholderText}
          value={barText}
          onChange={(e) => setBarText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      
      </div>
    </div>
      );
    }
    return(<div className={`search-bar-container ${cssClass}`}>
        <div className='search-bar-glow'></div>
      <div className="search-input-wrapper">
        <input 
          type="text" 
          className="search-input" 
          placeholder={placeholderText}
          value={barText}
          onChange={(e) => setBarText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        
        <Dropdown
          show={showSortMenu}
          onToggle={(isOpen) => {setShowSortMenu(isOpen)}}
        >
        <DropdownToggle className={showSortMenu ? "search-icon-highlight" : "search-icon"}>
          <SortIcon/>
        </DropdownToggle>
        {showSortMenu ? <DropdownMenu className="drop-down">
          {options.map((option) => <>{option}<br/></>)}
        </DropdownMenu> : null}
      </Dropdown>
      
      </div>
    </div>);
}

export default InputBar;