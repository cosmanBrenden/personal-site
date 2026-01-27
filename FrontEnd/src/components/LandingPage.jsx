import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Tile from './Tile';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className='lander-wrapper'>

      <h1 className="blog-title">Brenden's Blog</h1>
      <div className='lander-button-container'>
        <div className='button-wrapper'>
          <Tile
            height='124px'
            fixedWidth={false}
            post={{title:"Enter"}}
            clickFunc={() => navigate("/blog-list")}
          />
        </div>
        <div className='button-wrapper'>
          <Tile
            height='124px'
            fixedWidth={false}
            post={{title:"About Me"}}
            clickFunc={() => navigate('/blog/aboutme')}
          />
        </div>
        <div className='button-wrapper'>
          <Tile
            height='124px'
            fixedWidth={false}
            post={{title:"How Tags Work"}}
            clickFunc={() => navigate('/blog/howto')}
          />
        </div>
        <div className='button-wrapper'>
          <Tile
            height='124px'
            fixedWidth={false}
            post={{title:"Guest Book"}}
            clickFunc={() => navigate('/guestbook')}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
