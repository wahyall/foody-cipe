const initState = {
  activeCategory: {name: 'All', path: ''},
  all: [],
  mainCourse: [],
  sideDish: [],
  appetizer: [],
  salad: [],
  drink: [],
  soup: []
}

export default function discover(state = initState, action) {
  switch (action.type) {
    case 'SET_DATA_DISCOVER':
      return {
        ...state,
        [action.name]: action.data
      }

    case 'SET_ACTIVE_CATEGORY':
      return {
        ...state,
        activeCategory: action.category
      }
  
    default:
      return state;
  }
}