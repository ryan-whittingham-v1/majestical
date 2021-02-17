export default (state = {}, action) => {
  const { name, duration, instructions, id } = action;
  switch (action.type) {
    case 'ADD_PROJECT':
      return Object.assign({}, state, {
        [id]: {
          name: name,
          duration: duration,
          instructions: instructions,
          id: id,
        },
      });
    case 'DELETE_PROJECT':
      let newState = { ...state };
      delete newState[id];
      return newState;
    default:
      return state;
  }
};
