import React from 'react';
import './ContentSlider.scss';
import { connect } from 'react-redux';
import { homeDispatch } from '../../store/libs';

// Component
import JumboCard from '../JumboCard/JumboCard';

// Icon
import arrow from '../../icon/arrow-black.svg';

class ContentSlider extends React.Component {
  openSeeMore = () => {
    this.props.onOpenSeeMore({
      active: true,
      title: this.props.title,
      data: this.props.data
    })
  }

  componentDidMount = () => {
    // Jika data kosong maka ambil data resep (request API)
    if (!this.props.data.length) {
      const getDataRecipe = homeDispatch[this.props.name];
      this.props.dispatch(getDataRecipe());
    }
  }
  
  render() {
    const renderedRecipe = this.props.data.slice(0, 10);
    const recipeCards = renderedRecipe.map(recipe => (
      <JumboCard.Full
        key={recipe.id}
        id={recipe.id}
        name={recipe.title}
        img={recipe.image}
        likes={recipe.aggregateLikes}
        rates={recipe.spoonacularScore}
        time={recipe.readyInMinutes}
        fullData={recipe} />
    ))
    const loadingCards = [
      <JumboCard.Loading />,
      <JumboCard.Loading />,
      <JumboCard.Loading />,
      <JumboCard.Loading />,
      <JumboCard.Loading />,
      <JumboCard.Loading />
    ];
  
    return (
      <div className="content-slider">
        <div className="header"
          onClick={this.openSeeMore}>
          <span>{this.props.title}</span>
          <img src={arrow} alt="See More" />
        </div>
        <div className="slider">
          <div className="slider-slide">
            {renderedRecipe.length ? recipeCards : loadingCards}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    home: state.home
  }
}

export default connect(mapStateToProps)(ContentSlider);