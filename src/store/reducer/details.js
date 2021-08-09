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
    
      case 'CLOSE_DETAILS':
        // Clear data
        return {
          ...state,
          data: {}
        }
  
    default:
      return state;
  }
}