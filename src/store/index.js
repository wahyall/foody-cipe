import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import details from './reducer/details';
import home from './reducer/home';
import discover from './reducer/discover';
import cookbook from './reducer/cookbook';
import toast from './reducer/toast';
import { postLocalStorage } from './libs/storage';

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