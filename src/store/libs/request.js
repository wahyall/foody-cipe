export const apiKey = '5c676c3605dd4442959e23e3bd5a6de6';

export const getInformation = async (id) => {
  return fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${id}&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => data.filter(recipe => recipe.image))
}

export const getRecipeNutrition = (id) => {
  return fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => data)
}

export const getRecipeIngredients = (id) => {
  return fetch(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => data.ingredients)
}

export const getRecipeInstruction = (id) => {
  return fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => data[0])
}

export const searchRecipes = (keyword) => {
  return fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${keyword}&number=20&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(async data => {
      if (data.results.length) {
        const recipesID = data.results.map(recipe => recipe.id);
        const recipesData = await getInformation(recipesID.join(','));
        return recipesData;
      } else {
        return [];
      }
    })
}

export const homeDispatch = {
  recommendation: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({type: 'SET_HOME_CONTENT', name: 'recommendation', data: recipesData})
        })
    }
  },
  popular: () => {
    const popularRecipesID = [776505, 475619, 716627, 716298, 715437, 715569, 715546, 725569, 725560, 715378, 716431, 715419, 715495, 715432, 716423, 715568, 715397, 715545, 715515, 735820];

    return async dispatch => {
      const recipesData = await getInformation(popularRecipesID.join(','));
      return dispatch({type: 'SET_HOME_CONTENT', name: 'popular', data: recipesData})
    }
  },
  rated: () => {
    const ratedRecipesID = [715424, 715497, 716432, 716627, 716408, 716426, 716370, 716276, 716311, 716437, 794349, 715544, 716406, 716381, 715385, 716195, 715391, 782600, 716268, 729366];

    return async dispatch => {
      const recipesData = await getInformation(ratedRecipesID.join(','));
      return dispatch({type: 'SET_HOME_CONTENT', name: 'rated', data: recipesData})
    }
  },
  recent: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({type: 'SET_HOME_CONTENT', name: 'recent', data: recipesData});
        })
    }
  },
  category: () => {
    const availableCategory = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'soup'];
    const randomIndex = Math.floor(Math.random() * availableCategory.length);
    const randomCategory = availableCategory[randomIndex];
    
    return dispatch => {
      dispatch({type: 'SET_CATEGORY_TITLE', title: randomCategory});

      fetch(`https://api.spoonacular.com/recipes/random?number=20&tags=${randomCategory}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({type: 'SET_HOME_CONTENT', name: 'category', data: recipesData})
        })
    }
  }
}

export const discoverDispatch = {
  all: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({type: 'SET_DATA_DISCOVER', name: 'all', data: recipesData});
        })
    }
  },
  mainCourse: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&tags=main course&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({type: 'SET_DATA_DISCOVER', name: 'mainCourse', data: recipesData});
        })
    }
  },
  sideDish: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&tags=side dish&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({type: 'SET_DATA_DISCOVER', name: 'sideDish', data: recipesData});
        })
    }
  },
  appetizer: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&tags=appetizer&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({type: 'SET_DATA_DISCOVER', name: 'appetizer', data: recipesData});
        })
    }
  },
  salad: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&tags=salad&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({type: 'SET_DATA_DISCOVER', name: 'salad', data: recipesData});
        })
    }
  },
  bread: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&tags=bread&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({type: 'SET_DATA_DISCOVER', name: 'bread', data: recipesData});
        })
    }
  },
  soup: () => {
    return dispatch => {
      fetch(`https://api.spoonacular.com/recipes/random?number=40&tags=soup&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Filter recipes yang tidak memiliki gambar
          const recipesData = data.recipes.filter(recipe => recipe.image);
          return dispatch({type: 'SET_DATA_DISCOVER', name: 'soup', data: recipesData});
        })
    }
  }
}