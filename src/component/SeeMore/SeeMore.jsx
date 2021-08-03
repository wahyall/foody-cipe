import React from 'react';
import './SeeMore.scss';
import { Link } from 'react-router-dom';

// Component
import JumboCard from '../JumboCard/JumboCard';

// Icon
import arrow from '../../icon/arrow-black.svg';
import search from '../../icon/search.svg';

const SeeMore = (props) => {  
  const recipeCards = props.data.map(recipe => (
    <JumboCard.Full
      key={recipe.id}
      name={recipe.title}
      img={recipe.image}
      likes={recipe.aggregateLikes}
      rates={recipe.spoonacularScore}
      time={recipe.readyInMinutes}
      desc={recipe.summary} />
  ))

  const loadingCards = [
    <JumboCard.Loading />,
    <JumboCard.Loading />,
    <JumboCard.Loading />,
    <JumboCard.Loading />,
    <JumboCard.Loading />,
    <JumboCard.Loading />
  ]
  
  return (
    <div className={"see-more" + (props.active ? ' active' : '')}>
      <div className="header">
        <img src={arrow} alt="back" className="back"
          onClick={() => (
            props.onCloseSeeMore({ ...props, active: false })
          )} />
        <div className="title">{props.title}</div>
        <Link to="/search" className="search">
          <img src={search} alt="search" />
        </Link>
      </div>
      <div className="content">
        {props.data.length ? recipeCards : loadingCards}
      </div>
    </div>
  )
}

export default SeeMore;