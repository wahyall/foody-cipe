import React from 'react';
import './SearchAutocomplete.scss';
import { Link } from 'react-router-dom';

// Icon
import arrow from '../../../icon/arrow-black.svg';
import search from '../../../icon/search.svg';

const SearchAutocomplete = (props) => {
  return (
    <div className="search-autocomplete">
      {props.autocomplete.map(item => (
        <Link to={"/search/" + item.title} className="item"
          onClick={() => props.onSetKeyword(item.title)}>
          <img src={search} alt="search" />
          <div>{item.title}</div>
          <img src={arrow} alt="arrow" />
        </Link>
      ))}
    </div>
  )
}

export default SearchAutocomplete;