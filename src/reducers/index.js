import formVisibleReducer from './form-visible-reducer';
import projectListReducer from './project-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterProjectList: projectListReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
