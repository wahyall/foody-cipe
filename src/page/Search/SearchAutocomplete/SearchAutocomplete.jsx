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
        <div className="item">
          <img src={search} alt="search" />
          <Link to={"/search/" + item.title}
            onClick={() => props.setKeyword(item.title)}>{item.title}</Link>
          <img src={arrow} alt="arrow" className="setter"
            onClick={() => props.autocompleteToKeyword(item.title)} />
        </div>
      ))}
    </div>
  )
}

export default SearchAutocomplete;