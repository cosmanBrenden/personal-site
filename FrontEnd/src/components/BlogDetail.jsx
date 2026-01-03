import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './BlogDetail.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

async function getContentURL(blog_id) {
  const res = await fetch(`/api/blog/${blog_id}`);
  if(!res.ok){
    throw new Error(`Response status: ${res.status}`)
  }
  const result = await res.json()
  return result
}

const BlogDetail = () => {
  const navigate = useNavigate();
  const [callback, setCallback] = useState("");
  const [blogContentURL, setBlogContentURL] = useState("/api/content/aboutme.html");
  const [blogID, setBlogID] = useState("aboutme")
  const [blogTitle, setBlogTitle] = useState("About Me")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let cb = urlParams.get('callback');
    if(!cb){
      cb = '';
    }
    setCallback(cb)

    setBlogID(window.location.pathname.split("/")[4])
    console.log(blogID)
    getContentURL(blogID).then(result => {
      let content = result["path"]
      setBlogContentURL(content)
      let title = result["title"]
      setBlogTitle(title)
    })
    
  }, [])
// DOMPurify.sanitize()
  const loremText = `<h2>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</h2>

<p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
</p><p><iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/3Op2bVsGwXrHxWs7XhR5bX?utm_source=generator" width="50%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe><p>`;

  return (
    <div className="blog-detail-page">
      {/* <img 
        className="blog-detail-background" 
        src="https://api.builder.io/api/v1/image/assets/TEMP/592ed22dc9aa08d84885076a5f619cab47078079?width=3840" 
        alt="" 
      /> */}
      <div className='blog-detail-glow'/>
      <div className="blog-window-overlay">
        <div className="blog-window">
          <button className="back-button" onClick={() => navigate('/blog-list'.concat(callback))}>
            {/* <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.65 26L26.85 37.2L24 40L8 24L24 8L26.85 10.8L15.65 22H40V26H15.65Z" fill="var(--text-color)"/>
            </svg> */}
            <ArrowBackIcon/>
          </button>

          <h1 className="blog-detail-title">{blogTitle}</h1>
          
          <div className="blog-detail-content">
            <iframe src={blogContentURL}></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
