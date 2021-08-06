import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import details from './details';
import home from './home';
import discover from './discover';
import cookbook from './cookbook';
import toast from './toast';
import { getDate } from './libs';
import { initLocalStorage, getLocalStorage } from './local_storage';
import { updateSessionStorage } from './session_storage';

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
initLocalStorage();

// Subscription
store.subscribe(() => {
  // Update localStorage setiap kali redux store berubah
  const cookbook = store.getState().cookbook;
  localStorage.setItem('cookbook', JSON.stringify(cookbook));
});

// Cek apakah tanggal/hari sudah berganti
const currentDate = getDate();
const tempDate = getLocalStorage('tempDate');
if (currentDate !== tempDate) {
  updateSessionStorage('isTomorrow', true);
} else {
  updateSessionStorage('isTomorrow', false);
}

export default store;