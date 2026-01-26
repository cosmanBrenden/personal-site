import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Window from "./Window";
import LoadingWindow from "./LoadingWindow";

async function getSignatures(blog_id=null) {
    const insertVal = blog_id !== null ? blog_id : "";
  const res = await fetch(`/api/readguestbook/${insertVal}`);
  if(!res.ok){
    throw new Error(`Response status: ${res.status}`);
  }
  const result = await res.json();
  return result;
}
// new Date(post.date * 1000).toString()
const GuestBook = () => {
    const navigate = useNavigate();

    const [signedGuestBook, setSignedGuestBook] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [signatures, setSignatures] = useState([]); 

    const handleBackClick = () => {
        navigate(`/`);
    };

    useEffect(() => {
    
        // If not in cache, fetch metadata then content
        const fetchSignatures = async () => {
          setIsLoading(true);
          setError(null);
    
          try {
            // Step 1: Fetch blog metadata
            const result = await getSignatures();
            
            // setSignatures([]);
    
            // // Step 2: Fetch blog content
            // const contentResponse = await fetch(contentURL);
            // if (!contentResponse.ok) {
            //   throw new Error(`Failed to fetch content: ${contentResponse.status}`);
            // }
            
            // const contentText = await contentResponse.text();
            // const sanitizedContent = DOMPurify.sanitize(contentText);
            // const sanitizedContent = contentText;
            
            // Add to cache and update state
            // add(blogID, sanitizedContent, title, tags.toString());
            for(let i = 0; i < result.length; i++){
                signatures.push(result[i]);
            }

            setIsLoading(false);
            
          } catch (err) {
            console.error('Error loading guestbook:', err);
            setError('Failed to load guestbook content');
            setIsLoading(false);
          }
        };
    
        fetchSignatures();
      }, []);


    if(isLoading){
        return(
            <Window returnFunction={handleBackClick} innerContent={
                <LoadingWindow text={"Guesting the book..."}/>
            }/>
        );
    }

    else if(error){
        return(
            <Window returnFunction={handleBackClick} innerContent={
                <div>
                    {error}
                </div>
            }/>
        );
    }

    else if(signedGuestBook){
        return(
            <Window returnFunction={handleBackClick} innerContent={
                <div>
                    Fuck off
                </div>
            }/>
        );
    }

    return(
        <Window returnFunction={handleBackClick} innerContent={
            <div>
                {signatures.map((signa) => {
                    console.log("doing something")
                    return(
                        <div>
                            {signa.time}
                            {signa.name}
                            {signa.message}
                        </div>
                    )
                })}
            </div>
        }/>
    );
}

export default GuestBook;