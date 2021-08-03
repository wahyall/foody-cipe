const initState = {
  keyword: '',
  data: []
}

export default function search(state = initState, action) {
  switch (action.type) {
    case 'SET_DATA_SEARCH':
      return {
        ...state,
        keyword: action.keyword,
        data: action.data
      }
    
    case 'CLEAR_SEARCH':
      return {
        ...state,
        keyword: '',
        data: []
      }

    default:
      return state;
  }
}