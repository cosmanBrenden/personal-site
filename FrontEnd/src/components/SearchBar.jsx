import React from "react";
import "./SearchBar.css";
import SortIcon from '@mui/icons-material/Sort';

const SearchBar = ({barText, setBarText, handleKeyPress, showSortMenu, setShowSortMenu}) => {
    return(<div className="search-bar-container">
            
             <div className='search-bar-glow'></div>
            <div className="search-input-wrapper">
              {/* {showSortMenu ? "fart" : "poo"} */}
              <input 
                type="text" 
                className="search-input" 
                placeholder="Tags_" 
                value={barText}
                onChange={(e) => setBarText(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button 
                className="search-icon"
                onClick={() => {setShowSortMenu(!showSortMenu)}}
              ><SortIcon/></button>
            </div>
          </div>);
}

export default SearchBar;