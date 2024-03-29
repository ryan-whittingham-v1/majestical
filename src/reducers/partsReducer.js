import * as c from '../actions/ActionTypes';

let initialState = {
  isLoading: true,
  data: {},
  error: null,
  staleData: false,
};

export default function partsReducer(state = initialState, action) {
  switch (action.type) {
    case c.REQUEST_PARTS_DATA:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case c.GET_PARTS_DATA_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        data: action.data,
        staleData: false,
      });
    case c.GET_PARTS_DATA_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
        data: {},
      });
    case c.PARTS_DATA_UPDATED:
      console.log('DataUPdated');
      return Object.assign({}, state, {
        staleData: true,
      });
    default:
      return state;
  }
}
