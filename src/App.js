import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Page
import Home from './page/Home/Home';
import Discover from './page/Discover/Discover';
import Cookbook from './page/Cookbook/Cookbook';
import Details from './page/Details/Details';
import Search from './page/Search/Search';

// Component
import SearchBox from './component/SearchBox/SearchBox';
import BottomNav from './component/BottomNav/BottomNav';
import SeeMore from './component/SeeMore/SeeMore';

class App extends React.Component {
  render() {
    return (
      <Router>
        {/* Global Component */}
        <SearchBox />
        <Route path="" render={props => (
          <BottomNav {...props} />
        )} />

        <Switch>
          {/* Home*/}
          <Route exact path="/" render={props => (
            <Home {...props} />
          )} />

          {/* Discover */}
          <Route path="/discover" render={props => (
            <Discover {...props} />
          )} />

          {/* Cookbook */}
          <Route path="/cookbook" render={props => (
            <Cookbook {...props} />
          )} />

          {/* Details */}
          <Route path="/details/:id" render={props => (
            <Details {...props} />
          )} />

          {/* Search */}
          <Route path="/search" render={props => (
            <Search {...props} />
          )} />
            
        </Switch>
      </Router>
    )
  }
}

export default App;