import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './BlogDetail.css';
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

const BlogDetail = () => {
  const navigate = useNavigate();
  const [callback, setCallback] = useState('');
  const [blogContentURL, setBlogContentURL] = useState(null);
  const [blogID, setBlogID] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [innerHTML, setInnerHTML] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackHTML = `<div class="blog-detail-content">
    <h1>Nobody here but us chickens...</h1>
    <img src="/api/content/chicken.png" alt="Chicken"></img>
  </div>`;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let cb = urlParams.get('callback') || '';
    setCallback(cb);
    
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[2];
    setBlogID(id);
  }, []);

  useEffect(() => {
    if (!blogID) return;

    setIsLoading(true);
    setError(null);
    
    getContentURL(blogID)
      .then(result => {
        let content = result["path"];
        let title = result["title"];
        setBlogContentURL(content);
        setBlogTitle(title);
      })
      .catch(err => {
        console.error('Error fetching blog metadata:', err);
        setError('Failed to load blog post');
        setBlogTitle("Where do you think you're going?");
        setBlogContentURL(null);
        setInnerHTML(fallbackHTML);
        setIsLoading(false);
      });
  }, [blogID]);

  useEffect(() => {
    if (!blogContentURL) return;

    setIsLoading(true);
    
    fetch(blogContentURL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        setInnerHTML(DOMPurify.sanitize(text));
        setIsLoading(false);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching blog content:', err);
        setError('Failed to load blog content');
        setInnerHTML(fallbackHTML);
        setIsLoading(false);
      });
  }, [blogContentURL]);

  if (isLoading && !error) {
    return (
      <div className="blog-detail-page">
        <div className='blog-detail-glow'/>
        <div className="blog-window-overlay">
          <div className="blog-window">
            <button className="back-button" onClick={() => navigate('/blog-list'.concat(callback))}>
              <ArrowBackIcon/>
            </button>
            <LoadingWindow text={"Buckle Your Seatbelts..."}/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className='blog-detail-glow'/>
      <div className="blog-window-overlay">
        <div className="blog-window">
          <button className="back-button" onClick={() => navigate('/blog-list'.concat(callback))}>
            <ArrowBackIcon/>
          </button>

          <h1 className="blog-detail-title">{blogTitle || "Where do you think you're going?"}</h1>
          
          <div 
            className="blog-detail-content" 
            dangerouslySetInnerHTML={{
              __html: innerHTML || fallbackHTML
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;