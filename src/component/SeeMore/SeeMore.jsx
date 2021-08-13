import React, { useRef, useState, useEffect } from 'react';
import './SeeMore.scss';
import { Link } from 'react-router-dom';

// Component
import JumboCard from '../JumboCard/JumboCard';

// Icon
import arrow from '../../icon/arrow-black.svg';
import search from '../../icon/search.svg';

const SeeMore = (props) => {  
  const content = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const paths = window.location.pathname.split('/');
  useEffect(() => {
    if (paths[2]) {
      setIsOpen(true);
    } else {
      setIsOpen(false);

      // Auto scroll kembali ke atas, agar saat dibuka lagi berada di atas
      setTimeout(() => {
        // Menunggu animasi swipe selesai
        content.current.scrollTop = 0;
      }, 200);
    }
  });

  const recipeCards = props.data.map(recipe => (
    <JumboCard.Full
      key={recipe.id}
      name={recipe.title}
      img={recipe.image}
      likes={recipe.aggregateLikes}
      rates={recipe.spoonacularScore}
      time={recipe.readyInMinutes}
      desc={recipe.summary} />
  ));

  const loadingCards = [
    <JumboCard.Loading />,
    <JumboCard.Loading />,
    <JumboCard.Loading />,
    <JumboCard.Loading />,
    <JumboCard.Loading />,
    <JumboCard.Loading />
  ];
  
  return (
    <main className={"see-more" + (isOpen ? ' active' : '')}>
      <header>
        <Link to="/" onClick={() => props.onCloseSeeMore({ ...props, active: false })}>
          <img src={arrow} alt="back" className="back" />
        </Link>
        <div className="title">{props.title}</div>
        <Link to="/search" className="search">
          <img src={search} alt="search" />
        </Link>
      </header>
      <section className="content" ref={content}>
        {props.data.length ? recipeCards : loadingCards}
      </section>
    </main>
  )
}

export default SeeMore;