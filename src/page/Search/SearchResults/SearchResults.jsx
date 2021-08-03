import React from 'react';
import './SearchResults.scss';

// Component
import FeedCard from '../../../component/FeedCard/FeedCard';

// Libs
import { searchRecipes } from '../../../store/libs';

// Icon
import imageNotFound from '../../../icon/not-found.svg';

class SearchResults extends React.Component {
  state = {
    keyword: this.props.match.params.keyword,
    data: [],
    isNotFound: false
  }

  componentDidMount = async () => {
    console.log(this.state, this.props);
    const data = await searchRecipes(this.state.keyword);
    const isNotFound = !data.length ? true : false;
    this.setState({ data, isNotFound });
  }

  render() {    
    const recipeCards = this.state.data.map(recipe => (
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
        <div>No result found for <span>"{this.state.keyword}"</span></div>
      </div>
    )

    return (
      <div className={"search-results" + (this.state.isNotFound ? " not-found" : "")}>
        {/* 1. Cek apakah data memiliki isi */}
        {/* jika "True" tampilkan <recipeCards />, jika tidak lanjut ke nomor 2 */}

        {/* 2. Cek apakah pencarian tidak mengembalikan data, alias Not Found */}
        {/* jika "True" tampilkan <notFound />, jika tidak tampilkan <loadingCards /> */}
        {this.state.data.length ? recipeCards : (this.state.isNotFound ? notFound : loadingCards)}
      </div>
    )
  }
}

export default SearchResults;