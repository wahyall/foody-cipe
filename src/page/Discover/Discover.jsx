import React, { useEffect } from 'react';
import './Discover.scss';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { discoverDispatch } from '../../store/libs/request';

// Component
import FeedCard from '../../component/FeedCard/FeedCard';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableCategory: [
        {name: 'All', path: ''},
        {name: 'Main Course', path: '/main-course'},
        {name: 'Side Dish', path: '/side-dish'},
        {name: 'Appetizer', path: '/appetizer'},
        {name: 'Salad', path: '/salad'},
        {name: 'Bread', path: '/bread'},
        {name: 'Soup', path: '/soup'}
      ],
      activeCategory: this.props.discover.activeCategory.name
    }
    this.tabCategories = React.createRef();
  }

  componentDidMount = () => {
    const pathCategory = window.location.pathname.replace('/discover', '');
    this.state.availableCategory.forEach(category => {
      if (category.path === pathCategory) {
        this.props.dispatch({type: 'SET_ACTIVE_CATEGORY', category});
      }
    });

    this.draggableOverflow();
  }

  componentDidUpdate = () => {
    if (this.props.discover.activeCategory.name !== this.state.activeCategory) {
      this.setState({
        activeCategory: this.props.discover.activeCategory.name
      });
    }
  }

  draggableOverflow = () => {
    const dragElem = this.tabCategories.current;
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
    return (
      <div id="discover">
        <div className="tab-categories" ref={this.tabCategories}>
          <div className="tab-slider">
            {this.state.availableCategory.map(category => (
              <Link to={"/discover" + category.path} key={category.name} className="tab-link" draggable="false"
                onClick={() => this.props.dispatch({type: 'SET_ACTIVE_CATEGORY', category})}>
                <div className={"tab-item" + (category.name === this.state.activeCategory ? " active" : "")}>
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <Switch>
          <Route exact path="/discover" key="all" render={props => (
            <DiscoverContent name="all" data={this.props.discover.all} {...props} />
          )} />
          <Route exact path="/discover/main-course" key="mainCourse" render={props => (
            <DiscoverContent name="mainCourse" data={this.props.discover.mainCourse} {...props} />
          )} />
          <Route exact path="/discover/side-dish" key="sideDish" render={props => (
            <DiscoverContent name="sideDish" data={this.props.discover.sideDish} {...props} />
          )} />
          <Route exact path="/discover/appetizer" key="appetizer" render={props => (
            <DiscoverContent name="appetizer" data={this.props.discover.appetizer} {...props} />
          )} />
          <Route exact path="/discover/salad" key="salad" render={props => (
            <DiscoverContent name="salad" data={this.props.discover.salad} {...props} />
          )} />
          <Route exact path="/discover/bread" key="bread" render={props => (
            <DiscoverContent name="bread" data={this.props.discover.bread} {...props} />
          )} />
          <Route exact path="/discover/soup" key="soup" render={props => (
            <DiscoverContent name="soup" data={this.props.discover.soup} {...props} />
          )} />
        </Switch>
      </div>
    )
  }
}

const DiscoverContent = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.data.length) {
      const getDataRecipe = discoverDispatch[props.name];
      dispatch(getDataRecipe());
    }
  }, []);

  const recipeCards = props.data.map(recipe => (
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
      {props.data.length ? recipeCards : loadingCards}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    discover: state.discover
  }
}

export default connect(mapStateToProps)(Discover);