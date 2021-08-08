import React from 'react';
import './ContentSlider.scss';
import { connect } from 'react-redux';
import { homeDispatch } from '../../store/libs/request';

// Component
import JumboCard from '../JumboCard/JumboCard';

// Icon
import arrow from '../../icon/arrow-black.svg';

// Libs
import { checkIsTomorrow } from '../../store/libs/common';
import { getLocalStorage, postLocalStorage, initLocalStorage } from '../../store/libs/storage';
import { draggableOverflow } from '../../store/libs/common';

const isTomorrow = checkIsTomorrow();
if (isTomorrow) {
  initLocalStorage();
}

class ContentSlider extends React.Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }

  componentDidMount = () => {
    const initData = getLocalStorage(this.props.name);
    if (!this.props.data.length) {
      if (!isTomorrow && (initData)) {
        // Jika hari in adalah "besok" dan initData ada (tidak hilang atau rusak),
        // maka ambil data resep yang sebelumnya sudah disimpan di localStorage
        // (untuk mempercepat load data)
        this.props.dispatch({type: 'SET_HOME_CONTENT', name: this.props.name, title: initData.title, data: initData.data});
      } else {
        // Ambil data resep melalui Request API
        const getDataRecipe = homeDispatch[this.props.name];
        this.props.dispatch(getDataRecipe());
      }
    }

    draggableOverflow(this.slider.current);
  }

  componentDidUpdate = () => {
    if (this.props.data.length) {
      postLocalStorage(this.props.name, {
        title: this.props.title,
        data: this.props.data
      });
    }
  }

  openSeeMore = () => {
    this.props.onOpenSeeMore({
      active: true,
      title: this.props.title,
      data: this.props.data
    })
  }
  
  render() {
    // console.log(this.props.name, this.props.data)
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
        <div className="slider" ref={this.slider}>
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