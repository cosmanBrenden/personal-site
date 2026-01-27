import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Window from "./Window";
import LoadingWindow from "./LoadingWindow";
import InputBar from "./InputBar";

async function getSignatures(blog_id=null) {
    const insertVal = blog_id !== null ? blog_id : "";
  const res = await fetch(`/api/readguestbook/${insertVal}`);
  if(!res.ok){
    throw new Error(`Response status: ${res.status}`);
  }
  const result = await res.json();
  return result;
}

async function sendSignature(signToSend){
    const data = Object.fromEntries(signToSend);

    // if(!signToSend.get("name") || !signToSend.get("message")){
    //     throw new Error("Incomplete signature!")
    // }
    // console.log(`Trying to send! ${data.get("name")} ${data.get("message")}`)
    const res = await fetch("/api/signguestbook/",{
        method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
    });
    const result = await res.json()
    // console.log(res.toString())
    return result;
}
// new Date(post.date * 1000).toString()
const GuestBook = () => {
    const navigate = useNavigate();

    const [signedGuestBook, setSignedGuestBook] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [signatures, setSignatures] = useState([]);
    // const [signature, setSignature] = useState(new Map());
    const [nameText, setNameText] = useState("")
    const [messageText, setMessageText] = useState("");

    const handleBackClick = () => {
        navigate(`/`);
    };

    useEffect(() => {
    
        // If not in cache, fetch metadata then content
        const fetchSignatures = async () => {
          setIsLoading(true);
          setErrorMsg(null);
    
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
            setErrorMsg('Failed to load guestbook content');
            setIsLoading(false);
          }
        };
    
        fetchSignatures();
      }, []);
    
    useEffect(() => {
        setTimeout(() => {
            setErrorMsg(null);
        }, 2000);
    }, [errorMsg])

    const handleSubmit = () => {
        const send = async () => {
            if(nameText === "" || messageText === ""){
                setErrorMsg("Incomplete submission, please fill out both fields!")
                return;
            }
            try {
                const req = new Map([["name", nameText],["message", messageText]]);
                // req.set("name", nameText)
                // req.set("message", messageText)
                // console.log(req.get("name"));
                // console.log(req.get("message"));
                const res = await sendSignature(req);
                console.log(res.status)
                if(!res.status === "success"){
                    throw new Error(res.status);
                }
                setErrorMsg("Success!")
                setSignedGuestBook(true)
            } catch (error) {
                console.error(error)
                setErrorMsg("Error in sending signature!")
            }
            
        }
        send()
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };


    if(isLoading && !errorMsg){
        return(
            <Window returnFunction={handleBackClick} innerContent={
                <LoadingWindow text={"Guesting the book..."}/>
            }/>
        );
    }

    else if(errorMsg){
        return(
            <Window returnFunction={handleBackClick} innerContent={
                <div>
                    {errorMsg}
                </div>
            }/>
        );
    }

    else if(signedGuestBook){
        return(
            <Window returnFunction={handleBackClick} innerContent={
                <div>
                    You're done here
                </div>
            }/>
        );
    }

    return(
        <Window returnFunction={handleBackClick} innerContent={
            <div>
                <InputBar cssClass="relative-bar" placeholderText="Name_" barText={nameText} setBarText={setNameText} handleKeyPress={handleKeyPress}/>
                <InputBar cssClass="relative-bar" placeholderText="Message_" barText={messageText} setBarText={setMessageText} handleKeyPress={handleKeyPress}/>
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