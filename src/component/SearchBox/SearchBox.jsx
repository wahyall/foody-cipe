import React from 'react';
import './SearchBox.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Icon
import search from '../../icon/search.svg';

const SearchBox = () => {
  const dispatch = useDispatch();

  return (
    <Link to="/search" className="search-box"
      onClick={() => dispatch({type: 'OPEN_SEARCH'})}>
      <div>Search recipes ...</div>
      <img src={search} alt="search" />
    </Link>
  )
}

export default SearchBox;