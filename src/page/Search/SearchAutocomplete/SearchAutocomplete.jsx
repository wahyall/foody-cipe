import React from 'react';
import './SearchAutocomplete.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Icon
import arrow from '../../../icon/arrow-black.svg';
import search from '../../../icon/search.svg';

// Libs
import { searchRecipes } from '../../../store/libs/request';

const SearchAutocomplete = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="search-autocomplete">
      {props.autocomplete.map(item => (
        <div className="item">
          <img src={search} alt="search" />
          <Link to={"/search/" + item.title}
            onClick={() => dispatch(searchRecipes(item.title))}>{item.title}</Link>
          <img src={arrow} alt="arrow" className="setter"
            onClick={() => props.autocompleteToKeyword(item.title)} />
        </div>
      ))}
    </div>
  )
}

export default SearchAutocomplete;