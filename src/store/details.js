const initState = {
  data: {}
}
export default function details(state = initState, action) {
  switch (action.type) {
    case 'GO_DETAILS':
      return {
        ...state,
        data: action.data
      }
  
    default:
      return state;
  }
}