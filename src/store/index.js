import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import details from './details';
import home from './home';
import discover from './discover';
import cookbook from './cookbook';
import toast from './toast';

// Reducer
const reducer = combineReducers({
  details,
  home,
  discover,
  cookbook,
  toast
})

// Store
const store = createStore(reducer, applyMiddleware(thunk));
console.log(store.getState());

// Subscription
store.subscribe(() => {
  console.log(store.getState());
})

export default store;