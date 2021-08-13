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
import apiKey from '../../api_key';
import { searchRecipes } from '../../store/libs/request';

// Storage
import { getSessionStorage } from '../../store/libs/storage';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autocomplete: []
    };
    this.inputSearch = React.createRef();
  }

  getAutocompleteName = (ev) => {
    const keyword = ev.target.value;
    this.props.dispatch({type: 'SET_SEARCH_KEYWORD', keyword})

    if (keyword.length >= 3) {
      fetch(`https://api.spoonacular.com/recipes/autocomplete?number=6&query=${keyword}&apiKey=${apiKey[1]}`)
        .then(response => response.json())
        .then(data => data.code === 402 ? this.props.dispatch({type: 'SET_ERROR'}) : this.setState({autocomplete: data}))
    }
  }

  componentDidMount = () => {
    const paths = this.props.location.pathname.split('/');

    // Mengecek jika user langsung menuju ke halaman pencarian,
    // dan disertai dengan keywrod seperti /search/:keywrod
    if (!paths[2]) {
      this.inputSearch.current.focus();
    }
    this.inputSearch.current.value = this.props.search.keyword;

  }

  componentDidUpdate = () => {
    this.inputSearch.current.value = this.props.search.keyword;
  }

  render() {
    return (
      <div id="search">
        <div className="header">
          <button 
            onClick={() => {
              this.props.history.push(getSessionStorage('prevPage') || '');
              this.props.dispatch({type: 'CLEAR_SEARCH', clear: 'keyword'});
              this.props.dispatch({type: 'CLEAR_SEARCH', clear: 'results'});
            }}>
            <img className="back" src={arrow} alt="back" />
          </button>
          <form onSubmit={(ev) => {
            ev.preventDefault();
            this.inputSearch.current.blur();
            this.props.history.push("/search/" + this.inputSearch.current.value);
            this.props.dispatch(searchRecipes(this.inputSearch.current.value));
          }}>
            <Link to="/search" className="input-search"
              onClick={() => this.props.dispatch({type: 'CLEAR_SEARCH', clear: 'results'})}>
              <input type="text" placeholder="Search recipes ..."
                onInput={this.getAutocompleteName}
                ref={this.inputSearch} />
              {/* Saat user menginputkan sesuatu maka icon clear di bawah akan muncul */}
              {/* berfungsi untuk mereset (clear) keyword pencarian pada input */}
              <img src={close} alt="clear search input"
                style={{display: !this.props.search.keyword.length && 'none'}}
                onClick={() => {
                  this.inputSearch.current.value = '';
                  this.inputSearch.current.focus();
                  this.setState({autocomplete: []});

                  this.props.dispatch({type: 'CLEAR_SEARCH', clear: 'keyword'});
                }} />
            </Link>
          </form>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/search" render={props => (
              <SearchAutocomplete {...props}
                autocomplete={this.state.autocomplete}
                autocompleteToKeyword={(autocomplete) => {
                  this.inputSearch.current.value = autocomplete;
                  this.inputSearch.current.focus();
                  this.props.dispatch({type: 'SET_SEARCH_KEYWORD', keyword: autocomplete})
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

const mapStateToProps = (state) => {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(Search);