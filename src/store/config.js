const initState = {
  isTomorrow: false
}

export default function config(state = initState, action) {
  switch (action.key) {
    case 'SET_TOMORROW':
      return {
        ...state,
        isTomorrow: true
      }
  
    default:
      return state;
  }
}