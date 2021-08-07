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
          data: action.data
        }
      }

    case 'SET_CATEGORY_TITLE':
      // Mengubah string menjadi huruf kapital
      const categoryTitle = action.title.split(' ')
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