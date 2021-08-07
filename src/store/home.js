const initState = {
  recommendation: {
    title: "Today's Recommendation",
    data: []
  },
  popular: {
    title: "Popular Recipes",
    data: []
  },
  rated: {
    title: "Most Rated",
    data: []
  },
  recent: {
    title: "Recent Recipes",
    data: []
  },
  category: {
    title: "",
    data: []
  },
}

export default function home(state = initState, action) {
  switch (action.type) {
    case 'SET_HOME_CONTENT':
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          title: action.title,
          data: action.data
        }
      }

    case 'SET_RECOMMENDATION':
      return {
        ...state,
        recommendation: {
          ...state.recommendation,
          data: action.data
        }
      }

    case 'SET_POPULAR':
      return {
        ...state,
        popular: {
          ...state.popular,
          data: action.data
        }
      }

    case 'SET_RATED':
      return {
        ...state,
        rated: {
          ...state.rated,
          data: action.data
        }
      }

    case 'SET_RECENT':
      return {
        ...state,
        recent: {
          ...state.recent,
          data: action.data
        }
      }

    case 'SET_CATEGORY':
      return {
        ...state,
        category: {
          ...state.category,
          data: action.data
        }
      }

    case 'SET_CATEGORY_TITLE':
      // Mengubah string menjadi huruf kapital
      const categoryTitle = action.name.split(' ')
        .map(str => str.replace(str[0], str[0].toUpperCase()))
        .join(' ');
      
        return {
          ...state,
          category: {
            ...state.category,
            title: categoryTitle + "'s You Might Like"
          }
        }

    default:
      return state;
  }
}