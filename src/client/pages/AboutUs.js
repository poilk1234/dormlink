import React from 'react';
import sean from '../../../public/avatar.jpg';
import charlie from '../../../public/charlie.jpg';
import polik from '../../../public/polik.jpg';
import kilong from '../../../public/kilong.jpg';
import leon from '../../../public/leon.jpg';
import algo from '../../../public/algo.png';

/* Non-MUI JSX for AboutUs page with styles in global styles.scss file */
const AboutPage = () => {
  return (
    <div>
      <div className='about-section'>
        <h1>About Us Page</h1>
        <p>
          Find your ideal roommate using our cosine similarity algorithm based
          off common roommate personality traits
        </p>
        <img
          src={algo}
          style={{ width: '100%', height: 'auto', maxWidth: '800px' }}
        />
        <p>built by group 39: CSCI3100 Spring 2020</p>
        <p>
          <a className='button' href='https://github.com/seanohare98/dormlink'>
            view more on GitHub
          </a>
        </p>
      </div>
      <div className='our-team'>
        <h1>Our Team</h1>
      </div>
      <div className='box'>
        <div style={{ float: 'left', margin: '20px' }}>
          <img alt='' src={sean} height='150px' width='150px' />
        </div>
        <div className='teammate-information'>
          <h2>Sean O’Hare</h2>
          <p style={{ color: 'grey' }}>Team Leader</p>
          <p>Major : CS</p>
          <p>
            GitHub :<a href='https://github.com/seanohare98'>seanohare98</a>
          </p>
          <p>Email : 1155116399@link.cuhk.edu.hk</p>
        </div>
      </div>
      <br />
      <br />
      <div className='box'>
        <div style={{ float: 'left', margin: '20px' }}>
          <img alt='' src={polik} height='150px' width='150px' />
        </div>
        <div className='teammate-information'>
          <h2>Po Tsz Ying</h2>
          <p style={{ color: 'grey' }}>Team member</p>
          <p>Major : CE</p>
          <p>
            GitHub :<a href='https://github.com/poilk199881'>poilk199881</a>
          </p>
          <p>Email : 1155110767@link.cuhk.edu.hk</p>
        </div>
      </div>
      <br />
      <br />
      <div className='box'>
        <div style={{ float: 'left', margin: '20px' }}>
          <img alt='' src={leon} height='150px' width='150px' />
        </div>
        <div className='teammate-information'>
          <h2> Kong Chun Hay Leon</h2>
          <p style={{ color: 'grey' }}>Team member</p>
          <p>Major : STAT</p>
          <p>
            GitHub : <a href='https://github.com/kchleon'>kchleon</a>
          </p>
          <p>Email : 1155108154@link.cuhk.edu.hk</p>
        </div>
      </div>
      <br />
      <br />
      <div className='box'>
        <div style={{ float: 'left', margin: '20px' }}>
          <img alt='' src={kilong} height='150px' width='150px' />
        </div>
        <div className='teammate-information'>
          <h2> Wong Ki Long</h2>
          <p style={{ color: 'grey' }}>Team member</p>
          <p>Major : MATH</p>
          <p>
            GitHub : <a href='https://github.com/2013612'>2013612</a>
          </p>
          <p>Email : 1155093001@link.cuhk.edu.hk</p>
        </div>
      </div>
      <br />
      <br />
      <div className='box'>
        <div style={{ float: 'left', margin: '20px' }}>
          <img alt='' src={charlie} height='150px' width='150px' />
        </div>
        <div className='teammate-information'>
          <h2> LI Cheuk Man</h2>
          <p style={{ color: 'grey' }}>Team member</p>
          <p>Major : MATH</p>
          <p>
            GitHub : <a href='https://github.com/LCM288'>LCM288</a>
          </p>
          <p>Email : 1155094029@link.cuhk.edu.hk</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
