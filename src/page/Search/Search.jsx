import React from 'react';
import './Search.scss';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

// Icon
import arrow from '../../icon/arrow-black.svg';
import close from '../../icon/close.svg';

// Component
import SearchAutocomplete from './SearchAutocomplete/SearchAutocomplete';
import SearchResults from './SearchResults/SearchResults';

// Libs
import { apiKey } from '../../store/libs';

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
        .then(data => this.setState({autocomplete: data}))
    }
  }

  goBack = () => {
    if (this.props.location.pathname.length > 8) {
      console.log('Go back twice')
      this.props.history.go(-2);
    } else {
      console.log('Go back once')
      this.props.history.goBack();
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
            onClick={this.goBack} />
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
                  this.setState({autocomplete: []});
                }} />
            </Link>
          </form>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/search" render={props => (
              <SearchAutocomplete {...props}
                autocomplete={this.state.autocomplete}
                onSetKeyword={(keyword) => this.inputSearch.current.value = keyword} />
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

export default Search;