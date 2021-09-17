import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';

// Page
import Home from './page/Home/Home';
import Discover from './page/Discover/Discover';
import Cookbook from './page/Cookbook/Cookbook';
import Details from './page/Details/Details';
import Search from './page/Search/Search';
import Error from './page/Error/Error';

// Component
import SearchBox from './component/SearchBox/SearchBox';
import BottomNav from './component/BottomNav/BottomNav';
import ToastInfo from './component/ToastInfo/ToastInfo';

const App = (props) => {
  if (props.error) {
    return (
      <Error />
    )
  }

  return (
    <Router>
      {/* Global Component */}
      <SearchBox />
      {props.toast.active && (<ToastInfo />)}
      <Route path="" render={props => (
        <BottomNav {...props} />
      )} />

      <Switch>
        {/* Home*/}
        <Route exact path={["/", "/more/recommendation", "/more/popular", "/more/rated", "/more/recent", "/more/category"]} render={props => (
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

const mapStateToProps = (state) => {
  return {
    toast: state.toast,
    error: state.error
  }
}

export default connect(mapStateToProps)(App);