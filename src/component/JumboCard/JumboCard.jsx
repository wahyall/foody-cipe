import React from 'react';
import './JumboCard.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Icon
import time from '../../icon/time.svg';
import likes from '../../icon/likes-white.svg';
import star from '../../icon/star-white.svg';

const JumboCard = {
  Full: (props) => {
    const dispatch = useDispatch();

    return (
      <div className="jumbo-card">
        <img src={props.img} alt="Image" className="recipe-img" draggable="false" />
        <div className="time">
          <img src={time} alt="Ready Time" />
          <span>{props.time} Min</span>
        </div>
        <Link to={"/details/" + props.id} className="title"
          onClick={() => dispatch({type: 'GO_DETAILS', data: props.fullData})}>
          <span className="name">{props.name}</span>
          <div style={{display: 'flex', marginBottom: '0.35rem', marginTop: '0.2rem'}}>
            <div className="likes">
              <img src={likes} alt="Likes" />
              <span>{props.likes}</span>
            </div>
            <div className="rates">
              <img src={star} alt="Rates" />
              <span>{props.rates}</span>
            </div>
          </div>
        </Link>
      </div>
    )
  },
  Loading: () => {
    return (
      <div className="loading-jumbo-card">
        <div className="shine"></div>
      </div>
    )
  }
}

export default JumboCard;