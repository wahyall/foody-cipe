import React, { useState, useEffect } from 'react';
import './SearchResults.scss';
import { connect, useDispatch } from 'react-redux';

// Component
import FeedCard from '../../../component/FeedCard/FeedCard';

// Libs
import { searchRecipes } from '../../../store/libs/request';

// Icon
import imageNotFound from '../../../icon/not-found.svg';

const SearchResults = (props) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState(props.search.keyword);

  useEffect(() => {
    // Jika keyword yang berasal dari store/redux kosong (case disini user langsung menuju halaman pencarian)
    if (!keyword.length) {
      const newKeyword = props.match.params.keyword;
      setKeyword(newKeyword);
      dispatch(searchRecipes(newKeyword));
    }
  }, []);

  const recipeCards = props.search.results.map(recipe => (
    <FeedCard.Full
      key={recipe.id}
      id={recipe.id}
      name={recipe.title}
      likes={recipe.aggregateLikes}
      rates={recipe.spoonacularScore}
      time={recipe.readyInMinutes}
      img={recipe.image}
      fullData={recipe} />
  ))

  const loadingCards = [
    <FeedCard.Loading />,
    <FeedCard.Loading />,
    <FeedCard.Loading />,
    <FeedCard.Loading />,
    <FeedCard.Loading />,
    <FeedCard.Loading />
  ]

  const notFound = (
    <div className="not-found">
      <img src={imageNotFound} alt="Not Found" />
      <div>No result found for <span>"{keyword}"</span></div>
    </div>
  )

  return (
    <div className={"search-results" + (props.search.isNotFound ? " not-found" : "")}>
      {/* 1. Cek apakah data memiliki isi */}
      {/* jika "True" tampilkan <recipeCards />, jika tidak lanjut ke nomor 2 */}

      {/* 2. Cek apakah pencarian tidak mengembalikan data, alias Not Found */}
      {/* jika "True" tampilkan <notFound />, jika tidak tampilkan <loadingCards /> */}
      {props.search.results.length ? recipeCards : (props.search.isNotFound ? notFound : loadingCards)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(SearchResults);
