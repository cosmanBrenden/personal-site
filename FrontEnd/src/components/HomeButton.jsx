import React from "react";
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import './HomeButton.css'

const HomeButton = ({centered=false}) =>{
    const navigate = useNavigate();
    return(
        <div className={centered ? "home-button-wrapper-centered" : "home-button-wrapper"} onClick={() => navigate("/")}>
            <HomeIcon fontSize={centered ? "large" : "medium"} className='home-button'/>
        </div>
    );
}

export default HomeButton