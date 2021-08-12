const initState = {
  keyword: "",
  results: [],
  isNotFound: false,
  isDirectSearch: false
}

export default function search(state = initState, action) {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        keyword: action.keyword,
        results: action.results,
        isNotFound: action.results.length ? false : true
      }

    case 'SET_SEARCH_KEYWORD':
      return {
        ...state,
        keyword: action.keyword
      }

    case 'SET_DIRECT_SEARCH':
      return {
        ...state,
        keyword: action.keyword,
        isDirectSearch: !state.isDirectSearch
      }

    case 'CLEAR_SEARCH':
      switch (action.clear) {
        case 'keyword':
          return {
            ...state,
            keyword: "",
            isNotFound: false
          }

        case 'results':
          return {
            ...state,
            results: [],
            isNotFound: false
          }
      
        default:
          break;
      }
  
    default:
      return state;
  }
}