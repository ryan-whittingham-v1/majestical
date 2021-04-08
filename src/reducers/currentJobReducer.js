import * as c from '../actions/ActionTypes';

let initialState = {
  data: 0,
};

export default function currentJobReducer(state = initialState, action) {
  switch (action.type) {
    case c.SET_CURRENT_JOB:
      return Object.assign({}, state, {
        data: action.data,
      });
    default:
      return state;
  }
}
