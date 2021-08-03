import React from 'react';
import './FeedCard.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Icon
import time from '../../icon/time.svg';

// Componenet
import ActionButton from '../ActionButton/ActionButton';

const FeedCard = {
  Full: (props) => {
    const dispatch = useDispatch();

    return (
      <div className="feed-card">
        <div className="head">
          <img src={props.img} className="recipe-img" />
          <ActionButton.Favorite fullData={props.fullData} />
          <div className="time">
            <img src={time} alt="ready time" />
            <span>{props.time} Min</span>
          </div>
        </div>
        <div className="body">
          <Link to={"/details/" + props.id} className="name"
            onClick={() => dispatch({type: 'GO_DETAILS', data: props.fullData})}>
            {props.name}
          </Link>
        </div>
      </div>
    )
  },
  Loading: () => {
    return (
      <div className="loading-feed-card">
        <div className="head">
          <div className="shine"></div>
        </div>
      </div>
    )
  }
}

export default FeedCard;