import React from "react";
import HomeButton from "./HomeButton";
import './FallbackPage.css'
import LoadingWindow from "./LoadingWindow";

const FallbackPage = () => {
    return(
        <>
            <LoadingWindow text={"404 Page Not Found..."}/>
            <HomeButton centered={true}/>
        </>
    );
}

export default FallbackPage