import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import details from './details';
import home from './home';
import discover from './discover';
import cookbook from './cookbook';
import toast from './toast';
import { postLocalStorage } from './local_storage';

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

// Subscription
store.subscribe(() => {
  // Update localStorage setiap kali redux store berubah
  const cookbook = store.getState().cookbook;
  postLocalStorage('cookbook', cookbook);
});

export default store;