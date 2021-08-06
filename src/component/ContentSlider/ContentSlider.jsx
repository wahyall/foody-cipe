import React from 'react';
import './ContentSlider.scss';
import { connect } from 'react-redux';
import { homeDispatch } from '../../store/libs';

// Component
import JumboCard from '../JumboCard/JumboCard';

// Icon
import arrow from '../../icon/arrow-black.svg';

// Storage
import { getLocalStorage, updateLocalStorage } from '../../store/local_storage';
import { getSessionStorage } from '../../store/session_storage';

const isTomorrow = getSessionStorage('isTomorrow');

class ContentSlider extends React.Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }

  componentDidMount = () => {
    // Jika data kosong maka ambil data resep
    const initData = getLocalStorage(this.props.name);
    if (!this.props.data.length) {
      if (!isTomorrow && (initData)) {
        // Jika hari in adalah "besok" dan initData ada (tidak hilang atau rusak),
        // maka ambil data resep yang sebelumnya sudah disimpan di localStorage
        // (untuk mempercepat load data)
        this.props.dispatch({type: 'SET_HOME_CONTENT', name: this.props.name, data: initData});
      } else {
        // Ambil data resep melalui Request API
        const getDataRecipe = homeDispatch[this.props.name];
        this.props.dispatch(getDataRecipe());
      }
    }

    this.draggableOverflow();
  }

  componentDidUpdate = () => {
    if (this.props.data.length) {
      updateLocalStorage(this.props.name, this.props.data);
    }
  }

  openSeeMore = () => {
    this.props.onOpenSeeMore({
      active: true,
      title: this.props.title,
      data: this.props.data
    })
  }

  draggableOverflow = () => {
    const dragElem = this.slider.current;
    if (dragElem.children[0].childElementCount <= 1) {
        return;
    }

    let dragElemPos = {
        top: 0,
        left: 0,
        x: 0,
        y: 0
    };

    const mouseDownHandler = (e) => {
        dragElem.style.userSelect = 'none';

        dragElemPos = {
          left: dragElem.scrollLeft,
          top: dragElem.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e) => {
        // How far the mouse has been moved
        const dx = e.clientX - dragElemPos.x;
        const dy = e.clientY - dragElemPos.y;

        // Scroll the element
        dragElem.scrollTop = dragElemPos.top - dy;
        dragElem.scrollLeft = dragElemPos.left - dx;
        dragElem.style.cursor = 'grabbing';
    };

    const mouseUpHandler = () => {
        dragElem.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);

        dragElem.style.cursor = 'grab';
    };

    // Attach the handler
    dragElem.addEventListener('mousedown', mouseDownHandler);
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