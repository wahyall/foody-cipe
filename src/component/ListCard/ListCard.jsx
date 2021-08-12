import React from 'react';
import './ListCard.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Icon
import trash from '../../icon/trash.svg';

class ListCard extends React.Component {
  constructor(props) {
    super(props);
    this.card = React.createRef();
    this.cardBody = React.createRef();
  }

  swipeItem = () => {
    const dragItem = this.cardBody.current;

    let currentX = 0;
    let currentY = 0;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let minTopOffset;
    let maxTopOffset;
    const swipeRange = -60;

    addSwipeEvent();

    function setupItemOffset(elem) {
      minTopOffset = elem.getBoundingClientRect().top;
      maxTopOffset = Number(getComputedStyle(elem).height.slice(0, -2)) + minTopOffset;
    }

    function addSwipeEvent() {
      dragItem.addEventListener("touchstart", dragStart, false);
      dragItem.addEventListener("touchend", dragEnd, false);
      dragItem.addEventListener("touchmove", drag, false);
    }

    function dragStart(e) {
      setupItemOffset(this);

      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      addSwipeEvent();
    }

    function dragEnd(e) {
      if (xOffset >= (swipeRange % 2)) {
        setTranslate(0);
        currentX = 0;
        xOffset = 0;
      } else if (xOffset < (swipeRange % 2)) {
        setTranslate(swipeRange);
        currentX = swipeRange;
        xOffset = swipeRange;
      }

      currentY = 0;
      yOffset = 0;

      addSwipeEvent();
    }

    function drag(e) {
      e.preventDefault();
      let tempY = initialY + currentY;
      if ((tempY >= minTopOffset && tempY <= maxTopOffset) && (tempY >= (initialY - 20) && tempY <= (initialY + 20))) {
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        if (currentX <= 0 && currentX >= swipeRange) {
            setTranslate(currentX); 
        }

      } else {
        dragItem.removeEventListener("touchmove", drag);
        if (xOffset >= (swipeRange % 2)) {
          setTranslate(0);
        } else if (xOffset < (swipeRange % 2)) {
          setTranslate(swipeRange);
        }
      }
    }

    function setTranslate(xPos) {
        dragItem.style.transform = `translate3d(${xPos}px, 0, 0)`;
    }
  }

  deleteRecipe = () => {
    // Membuat animasi swipe fade out saat dihapus
    this.card.current.style.transform = 'translate(-110%)';
    this.card.current.style.height = '0';
    this.card.current.style.opacity = '0';
    this.card.current.style.margin = '0';

    setTimeout(() => {
      this.props.dispatch({type: 'DELETE_RECIPE', id: this.props.cookbookID, recipe: this.props.recipe})
      this.props.setIsDeleting();
    }, 300);
  }

  componentDidMount = () => {
    this.swipeItem();
  }

  render() {
    return (
      <div className="list-card" ref={this.card}
        onClick={() => this.props.dispatch({type: 'GO_DETAILS', data: this.props.recipe})}>
        <Link to={"/details/" + this.props.recipe.id} className="body" ref={this.cardBody}>
          <img src={this.props.recipe.image} alt={this.props.recipe.name} />
          <div className="content">
            <span className="name">{this.props.recipe.title}</span>
            <span className="time">{this.props.recipe.readyInMinutes} Min</span>
          </div>
        </Link>
        <div className="delete"
          onClick={this.deleteRecipe}>
          <img src={trash} alt="delete recipe" />
        </div>
      </div>
    )
  }
}

export default connect(null)(ListCard);