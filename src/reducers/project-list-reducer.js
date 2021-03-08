import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { formattedWaitTime, id } = action;
  switch (action.type) {
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
