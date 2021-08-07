import { getLocalStorage } from '../libs/storage';

const initState = getLocalStorage('cookbook') || [
  {
    id: "favorite-recipes-1626578977045",
    name: "Favorite Recipes",
    desc: "",
    data: []
  }
];

export default function cookbook(state = initState, action) {
  const cookbookIndex = state.map(list => list.id).indexOf(action.id);
  
  switch (action.type) {
    case 'SAVE_RECIPE':
      // Menambahkan property timeAdded pada resep,
      // untuk nantinya saat dilakukan pengurutan resep di dalam Cookbook
      action.recipe.timeAdded = new Date().getTime();

      // Menambah resep ke daftar
      state[cookbookIndex].data.unshift(action.recipe);
      return [...state];

    case 'DELETE_RECIPE':
      // Menghapus resep dari daftar dengan cara memfilternya
      state[cookbookIndex].data = [...state][cookbookIndex].data.filter(recipe => recipe.id !== action.recipe.id);
      return [...state];

    case 'CREATE_COOKBOOK':
      state.push({
        id: action.id,
        name: action.name,
        desc: action.desc,
        data: []
      });
      return [...state];

    case 'EDIT_COOKBOOK':
      state[cookbookIndex].id = action.newId;
      state[cookbookIndex].name = action.name;
      state[cookbookIndex].desc = action.desc;
      return [...state];

    case 'DELETE_COOKBOOK':
      return state.filter(cookbook => cookbook.id !== action.id);
  
    default:
      return state;
  }
}