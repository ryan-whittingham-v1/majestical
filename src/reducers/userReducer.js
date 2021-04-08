import * as c from '../actions/ActionTypes';

const userReducer = (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case c.SET_USER:
      return {
        ...state,
        loggedIn: true,
      };
    case c.LOG_OUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};
export default userReducer;
