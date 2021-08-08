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
      // Jika action berisi title maka ambil title itu dan gunakan sebagai title baru,
      // jika tidak maka pakai title dari state yang sudah ada sebelumnya
      const title = action.title || state[action.name].title;

      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          title,
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