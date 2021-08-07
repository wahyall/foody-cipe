import React from 'react';
import './SearchBox.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Icon
import search from '../../icon/search.svg';

// Storage
import { postSessionStorage } from '../../store/session_storage';

const SearchBox = () => {
  return (
    <Link to="/search" className="search-box"
      onClick={() => postSessionStorage('prevPage', window.location.pathname)}>
      <div>Search recipes ...</div>
      <img src={search} alt="search" />
    </Link>
  )
}

export default SearchBox;