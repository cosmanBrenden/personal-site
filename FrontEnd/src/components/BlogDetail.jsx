import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
// import './Window.css';
import Window from './Window';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingWindow from './LoadingWindow';

async function getContentURL(blog_id) {
  const res = await fetch(`/api/blog/${blog_id}`);
  if(!res.ok){
    throw new Error(`Response status: ${res.status}`);
  }
  const result = await res.json();
  return result;
}

const BlogDetail = ({add, read}) => {
  const navigate = useNavigate();
  const [callback, setCallback] = useState('');
  const [blogContentURL, setBlogContentURL] = useState(null);
  const [blogID, setBlogID] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [innerHTML, setInnerHTML] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogTags, setBlogTags] = useState('')

  const fallbackHTML = `<div class="blog-detail-content">
    <h1>Nobody here but us chickens...</h1>
    <img class="blog-detail-content-img center glow-border" src="/api/content/chicken.png" alt="Chicken"></img>
  </div>`;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let cb = urlParams.get('callback') || '';
    setCallback(cb);
    
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[2];
    setBlogID(id);
  }, []);

  // Combined useEffect to handle all loading logic in one place
  useEffect(() => {
    if (!blogID) return;

    // Check cache first
    const [cachedContent, cachedTitle, cachedTags] = read(blogID);
    if (cachedContent !== undefined) {
      console.log('Loading from cache');
      setInnerHTML(cachedContent);
      setBlogTitle(cachedTitle);
      setBlogTags(cachedTags);
      setIsLoading(false);
      return;
    }

    // If not in cache, fetch metadata then content
    const fetchBlogData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Step 1: Fetch blog metadata
        const result = await getContentURL(blogID);
        const contentURL = result["path"];
        const title = result["title"];
        const tags = result['tags']
        
        setBlogTitle(title);
        setBlogContentURL(contentURL);
        setBlogTags(tags.toString());

        // Step 2: Fetch blog content
        const contentResponse = await fetch(contentURL);
        if (!contentResponse.ok) {
          throw new Error(`Failed to fetch content: ${contentResponse.status}`);
        }
        
        const contentText = await contentResponse.text();
        // const sanitizedContent = DOMPurify.sanitize(contentText);
        const sanitizedContent = contentText;
        
        // Add to cache and update state
        add(blogID, sanitizedContent, title, tags.toString());
        setInnerHTML(sanitizedContent);
        setIsLoading(false);
        
      } catch (err) {
        console.error('Error loading blog:', err);
        setError('Failed to load blog content');
        setBlogTitle("Where do you think you're going?");
        setInnerHTML(fallbackHTML);
        setBlogTags("");
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [blogID, read, add]); // Add dependencies

  // Handle back navigation
  const handleBackClick = () => {
    navigate(`/blog-list${callback}`);
  };

  // Loading view
  if (isLoading && !error) {
    return(
      <Window returnFunction={handleBackClick} innerContent={
        <LoadingWindow text={"Buckle Your Seatbelts..."}/>
      }/>
    );
  }
  // Loaded content view
  return(
    <Window returnFunction={handleBackClick} innerContent={
      <>
        <h1 className="blog-detail-title">{blogTitle || "Where do you think you're going?"}</h1>
          
          <div 
            className="blog-detail-content" 
            dangerouslySetInnerHTML={{
              __html: innerHTML || fallbackHTML
            }}
          />
          <br></br>
          <br></br>
          <div className='blog-detail-content' style={{textAlign: "center"}}>tags: {blogTags}</div>
      </>
    }/>
  )
};

export default BlogDetail;