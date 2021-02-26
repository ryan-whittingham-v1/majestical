import formVisibleReducer from './form-visible-reducer';
import projectListReducer from './project-list-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterProjectList: projectListReducer,
});

export default rootReducer;
