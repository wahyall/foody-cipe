import React from 'react';
import './Discover.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';

// Component
import DiscoverContent from './DiscoverContent';

class Discover extends React.Component {
  state = {
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

  componentDidMount = () => {
    const pathCategory = window.location.pathname.replace('/discover', '');
    this.state.availableCategory.forEach(category => {
      if (category.path === pathCategory) {
        this.props.dispatch({type: 'SET_ACTIVE_CATEGORY', category});
      }
    });
  }

  render() {
    return (
      <div id="discover">
        <div className="tab-categories">
          <div className="tab-slider">
            {this.state.availableCategory.map(category => (
              <Link to={"/discover" + category.path} key={category.name} className="tab-link"
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

const mapStateToProps = (state) => {
  return {
    discover: state.discover
  }
}

export default connect(mapStateToProps)(Discover);