import store from "..";
import apiKey from "../../api_key";

export const getInformation = async (id) => {
  return fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${id}&apiKey=${apiKey[0]}`)
    .then(response => response.json())
    .then(data => data.filter(recipe => recipe.image))
    .catch(() => store.dispatch({ type: 'SET_ERROR' }))
}

export const getRecipeNutrition = (id) => {
  return fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey[1]}`)
    .then(response => response.json())
    .then(data => data.code === 402 ? store.dispatch({ type: 'SET_ERROR' }) : data)
}

export const getRecipeIngredients = (id) => {
  return fetch(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey[1]}`)
    .then(response => response.json())
    .then(data => data.code === 402 ? store.dispatch({ type: 'SET_ERROR' }) : data.ingredients)
}

export const getRecipeInstruction = (id) => {
  return fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey[1]}`)
    .then(response => response.json())
    .then(data => data.code === 402 ? store.dispatch({ type: 'SET_ERROR' }) : data[0])
}

export const searchRecipes = (keyword) => {
  return dispatch => {
    dispatch({ type: 'SET_SEARCH_KEYWORD', keyword });
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${keyword}&number=20&addRecipeInformation=true&apiKey=${apiKey[4]}`)
      .then(response => response.json())
      .then(async data => {
        if (data.results.length) {
          return dispatch({ type: 'SET_SEARCH_RESULTS', keyword, results: data.results });
        } else {
          return dispatch({ type: 'SET_SEARCH_RESULTS', keyword, results: [] });
        }
      })
      .catch(() => store.dispatch({ type: 'SET_ERROR' }))
  }
}

export const homeDispatch = {
  recommendation: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey[2]}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({ type: 'SET_HOME_CONTENT', name: 'recommendation', data: recipesData })
        })
        .catch(() => store.dispatch({ type: 'SET_ERROR' }))
    }
  },
  popular: () => {
    const popularRecipesID = [776505, 715546, 715545, 716627, 716298, 715437, 715569, 715562, 725560, 715378, 716431, 715419, 715495, 715432, 716423, 715568, 715397, 715545, 715515, 735820];

    return async dispatch => {
      const recipesData = await getInformation(popularRecipesID.join(','));
      return dispatch({ type: 'SET_HOME_CONTENT', name: 'popular', data: recipesData })
    }
  },
  rated: () => {
    const ratedRecipesID = [715424, 715497, 716432, 716627, 716408, 716426, 716370, 716276, 716311, 716437, 794349, 715544, 716406, 716381, 715385, 716195, 715391, 782600, 716268, 729366];

    return async dispatch => {
      const recipesData = await getInformation(ratedRecipesID.join(','));
      return dispatch({ type: 'SET_HOME_CONTENT', name: 'rated', data: recipesData })
    }
  },
  recent: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey[2]}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({ type: 'SET_HOME_CONTENT', name: 'recent', data: recipesData });
        })
        .catch(() => store.dispatch({ type: 'SET_ERROR' }))
    }
  },
  category: () => {
    const availableCategory = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'soup'];
    const randomIndex = Math.floor(Math.random() * availableCategory.length);
    const randomCategory = availableCategory[randomIndex];

    return dispatch => {
      dispatch({ type: 'SET_CATEGORY_TITLE', title: randomCategory });

      fetch(`https://api.spoonacular.com/recipes/random?number=20&tags=${randomCategory}&apiKey=${apiKey[2]}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({ type: 'SET_HOME_CONTENT', name: 'category', data: recipesData })
        })
        .catch(() => store.dispatch({ type: 'SET_ERROR' }))
    }
  }
}

export const discoverDispatch = {
  all: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&apiKey=${apiKey[3]}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({ type: 'SET_DATA_DISCOVER', name: 'all', data: recipesData });
        })
        .catch(() => store.dispatch({ type: 'SET_ERROR' }))
    }
  },
  mainCourse: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&tags=main course&apiKey=${apiKey[5]}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({ type: 'SET_DATA_DISCOVER', name: 'mainCourse', data: recipesData });
        })
        .catch(() => store.dispatch({ type: 'SET_ERROR' }))
    }
  },
  sideDish: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&tags=side dish&apiKey=${apiKey[5]}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({ type: 'SET_DATA_DISCOVER', name: 'sideDish', data: recipesData });
        })
        .catch(() => store.dispatch({ type: 'SET_ERROR' }))
    }
  },
  appetizer: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&tags=appetizer&apiKey=${apiKey[5]}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({ type: 'SET_DATA_DISCOVER', name: 'appetizer', data: recipesData });
        })
        .catch(() => store.dispatch({ type: 'SET_ERROR' }))
    }
  },
  salad: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&tags=salad&apiKey=${apiKey[3]}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({ type: 'SET_DATA_DISCOVER', name: 'salad', data: recipesData });
        })
        .catch(() => store.dispatch({ type: 'SET_ERROR' }))
    }
  },
  drink: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&tags=drink&apiKey=${apiKey[3]}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({ type: 'SET_DATA_DISCOVER', name: 'drink', data: recipesData });
        })
        .catch(() => store.dispatch({ type: 'SET_ERROR' }))
    }
  },
  soup: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&tags=soup&apiKey=${apiKey[3]}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({ type: 'SET_DATA_DISCOVER', name: 'soup', data: recipesData });
        })
        .catch(() => store.dispatch({ type: 'SET_ERROR' }))
    }
  }
}