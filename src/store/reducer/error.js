export default function error(state = false, action) {
  switch (action.type) {
    case 'SET_ERROR':
      return true;

    default:
      return state;
  }
}