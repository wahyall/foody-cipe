import React from 'react';
import './Search.scss';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Icon
import arrow from '../../icon/arrow-black.svg';
import close from '../../icon/close.svg';

// Component
import SearchAutocomplete from './SearchAutocomplete/SearchAutocomplete';
import SearchResults from './SearchResults/SearchResults';

// Libs
import { apiKey } from '../../store/libs/request';

// Storage
import { getSessionStorage } from '../../store/libs/storage';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      autocomplete: []
    };
    this.inputSearch = React.createRef();
  }

  getAutocompleteName = (ev) => {
    const keyword = ev.target.value;
    this.setState({keyword})
    if (keyword.length >= 3) {
      fetch(`https://api.spoonacular.com/recipes/autocomplete?number=6&query=${keyword}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => data.code === 402 ? this.props.dispatch({type: 'SET_ERROR'}) : this.setState({autocomplete: data}))
    }
  }

  componentDidMount = () => {
    this.inputSearch.current.focus();
  }

  render() {
    return (
      <div id="search">
        <div className="header">
          <img className="back" src={arrow} alt="back"
            onClick={() => this.props.history.push(getSessionStorage('prevPage') || '')} />
          <form onSubmit={(ev) => {
            ev.preventDefault();
            this.inputSearch.current.blur();
            this.props.history.push("/search/" + this.inputSearch.current.value);
          }}>
            <Link to="/search" className="input-search">
              <input type="text" placeholder="Search recipes ..."
                onInput={this.getAutocompleteName}
                ref={this.inputSearch} />
              {/* Saat user menginputkan sesuatu maka icon clear di bawah akan muncul */}
              {/* berfungsi untuk mereset (clear) keyword pencarian pada input */}
              <img src={close} alt="clear search input"
                style={{display: !this.state.keyword.length && 'none'}}
                onClick={() => {
                  this.inputSearch.current.value = '';
                  this.inputSearch.current.focus();
                  this.setState({autocomplete: [], keyword: ''});
                }} />
            </Link>
          </form>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/search" render={props => (
              <SearchAutocomplete {...props}
                autocomplete={this.state.autocomplete}
                setKeyword={(keyword) => this.inputSearch.current.value = keyword}
                autocompleteToKeyword={(autocomplete) => {
                  this.inputSearch.current.value = autocomplete;
                  this.inputSearch.current.focus();
                }} />
            )} />
            <Route exact path="/search/:keyword" render={props => (
              <SearchResults {...props} />
            )} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default connect(null)(Search);