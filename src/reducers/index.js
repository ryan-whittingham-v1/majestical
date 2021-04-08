import formVisibleReducer from './formVisibleReducer';
import projectListReducer from './projectListReducer';
import userReducer from './userReducer';
import airTableReducer from './airTableReducer';
import currentJobReducer from './currentJobReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterProjectList: projectListReducer,
  airTableReducer,
  currentJobReducer,
  firestore: firestoreReducer,
  userReducer,
});

export default rootReducer;
