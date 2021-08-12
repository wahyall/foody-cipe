import React from 'react';
import './Error.scss';

// Icon
import sorry from '../../icon/sorry.svg';

const Error = () => {
  return (
    <div id="error">
      <div className="wrp">
        <img src={sorry} alt="sorry for the error" />
        <h6 className="title">Sorry for this incident</h6>
        <p className="message">Our daily quota has reached the limit.</p>
        <p className="message">But don't worry, you can find your favorite recipe tomorrow.</p>
      </div>
    </div>
  )
}

export default Error;