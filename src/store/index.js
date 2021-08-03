import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import search from './search';
import details from './details';
import home from './home';
import discover from './discover';
import cookbook from './cookbook';

// Reducer
const reducer = combineReducers({
  search,
  details,
  home,
  discover,
  cookbook
})

// Store
const store = createStore(reducer, applyMiddleware(thunk));
console.log(store.getState());

// Subscription
store.subscribe(() => {
  console.log(store.getState());
})

export default store;