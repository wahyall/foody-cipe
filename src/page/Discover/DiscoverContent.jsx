import React from 'react';
import { connect } from 'react-redux';
import { discoverDispatch } from '../../store/libs';

// Component
import FeedCard from '../../component/FeedCard/FeedCard';

class DiscoverContent extends React.Component {
  componentDidMount = () => {
    if (!this.props.data.length) {
      const getDataRecipe = discoverDispatch[this.props.name];
      this.props.dispatch(getDataRecipe());
    }
  }

  render() {
    const recipeCards = this.props.data.map(recipe => (
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

    return (
      <div className="discover-content">
        {this.props.data.length ? recipeCards : loadingCards}
      </div>
    )
  }
}

export default connect(null)(DiscoverContent);