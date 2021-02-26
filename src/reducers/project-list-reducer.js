import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const {
    name,
    duration,
    instructions,
    formattedWaitTime,
    timeOpen,
    id,
  } = action;
  switch (action.type) {
    case c.ADD_PROJECT:
      return Object.assign({}, state, {
        [id]: {
          name: name,
          duration: duration,
          instructions: instructions,
          id: id,
          timeOpen: timeOpen,
          formattedWaitTime: formattedWaitTime,
        },
      });
    case c.DELETE_PROJECT:
      let newState = { ...state };
      delete newState[id];
      return newState;
    case c.UPDATE_TIME:
      const newProject = Object.assign({}, state[id], { formattedWaitTime });
      const updatedState = Object.assign({}, state, {
        [id]: newProject,
      });
      return updatedState;
    default:
      return state;
  }
};
