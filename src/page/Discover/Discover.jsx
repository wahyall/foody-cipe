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

// Libs
import { draggableOverflow } from '../../store/libs/common';

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
        {name: 'Drink', path: '/drink'},
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

    draggableOverflow(this.tabCategories.current);
  }

  componentDidUpdate = () => {
    if (this.props.discover.activeCategory.name !== this.state.activeCategory) {
      this.setState({
        activeCategory: this.props.discover.activeCategory.name
      });
    }
  }

  render() {
    return (
      <main id="discover">
        <nav className="tab-categories" ref={this.tabCategories}>
          <div className="tab-slider">
            {this.state.availableCategory.map(category => (
              <Link to={"/discover" + category.path} key={category.name} className="tab-link" draggable="false"
                onClick={() => this.props.dispatch({type: 'SET_ACTIVE_CATEGORY', category})}>
                <span className={"tab-item" + (category.name === this.state.activeCategory ? " active" : "")}>
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </nav>
        
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
          <Route exact path="/discover/drink" key="drink" render={props => (
            <DiscoverContent name="drink" data={this.props.discover.drink} {...props} />
          )} />
          <Route exact path="/discover/soup" key="soup" render={props => (
            <DiscoverContent name="soup" data={this.props.discover.soup} {...props} />
          )} />
        </Switch>
      </main>
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
    <section className="discover-content">
      {props.data.length ? recipeCards : loadingCards}
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    discover: state.discover
  }
}

export default connect(mapStateToProps)(Discover);