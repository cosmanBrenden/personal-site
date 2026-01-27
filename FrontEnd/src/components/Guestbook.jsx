import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Window from "./Window";
import LoadingWindow from "./LoadingWindow";
import InputBar from "./InputBar";
import './Guestbook.css';

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
    const [signatures, setSignatures] = useState([...[]]);
    // const [signature, setSignature] = useState(new Map());
    const [nameText, setNameText] = useState("")
    const [messageText, setMessageText] = useState("");

    const handleBackClick = () => {
        navigate(`/`);
    };

    const fetchSignatures = async () => {
          setIsLoading(true);
          setErrorMsg(null);
    
          try {
            const result = await getSignatures();
            console.log(`Got result: ${result}`);

            setSignatures([...result])

            setIsLoading(false);
            
          } catch (err) {
            console.error('Error loading guestbook:', err);
            setErrorMsg('Failed to load guestbook content');
            setIsLoading(false);
          }
        };

    useEffect(() => {
        fetchSignatures();
      }, []);

    useEffect(() => {
        if(signedGuestBook){
            setTimeout(() => {
                setSignatures([...[]])
                fetchSignatures();
            }, 1000)
        }
    }, [signedGuestBook])
    
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
                <LoadingWindow text={errorMsg}/>
            }/>
        );
    }

    return(
        <Window returnFunction={handleBackClick} title={"Guest Book"} innerContent={
            <div className="guestbook-wrapper">
                {
                !signedGuestBook ?
                <>
                    <div style={{marginBottom:"10px"}}><InputBar cssClass="relative-bar" placeholderText="Name_" barText={nameText} setBarText={setNameText} handleKeyPress={handleKeyPress}/></div>
                    <div style={{marginBottom:"10px"}}><InputBar cssClass="relative-bar" placeholderText="Message_" barText={messageText} setBarText={setMessageText} handleKeyPress={handleKeyPress}/></div>
                </>
                :
                <div className="guestbook-block-inputs guestbook-background"><h1>Signature Submitted</h1></div>
                }
                <h2 style={{textAlign: "center"}}>Guest Book Signatures</h2>
                <ul className="guestbook-signatures guestbook-background">
                    
                    {signatures.map((signa) => {
                        return(
                            <li className="guestbook-signature-entry">
                                {/* {`${signa.time} ${signa.name} ${signa.message}`} */}
                                {/* {`“${signa.message}” - ${signa.name}, ${signa.time}`} */}
                                <h3 style={{wordWrap:"break-word"}}>{`“${signa.message}”`}</h3>
                                <p><b><i>{signa.name}</i></b> on {signa.time}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        }/>
    );
}

export default GuestBook;