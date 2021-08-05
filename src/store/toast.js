const initState = {
  active: false,
  message: ""
};

export default function toast(state = initState, action) {
  switch (action.type) {
    case 'SHOW_TOAST':
      return {
        ...state,
        active: true,
        message: action.message
      }

    case 'HIDE_TOAST':
      return {
        ...state,
        active: false,
        message: ""
      }
  
    default:
      return state;
  }
}