import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import projectListReducer from '../../reducers/project-list-reducer';
import * as c from './../../actions/ActionTypes';

describe('rootReducer', () => {
  let store = createStore(rootReducer);
  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      masterProjectList: {},
      formVisibleOnPage: false,
    });
  });
  test('Check that initial state of ticketListReducer matches root reducer', () => {
    expect(store.getState().masterProjectList).toEqual(
      projectListReducer(undefined, { type: null })
    );
  });

  test('Check that initial state of formVisibleReducer matches root reducer', () => {
    expect(store.getState().formVisibleOnPage).toEqual(
      formVisibleReducer(undefined, { type: null })
    );
  });

  test('Check that ADD_PROJECT action works for projectListReducer and root reducer', () => {
    const action = {
      type: c.ADD_PROJECT,
      name: 'Vortex',
      duration: 1,
      instructions: '4x8 Banner with hem and grommets',
      id: 1,
    };
    store.dispatch(action);
    expect(store.getState().masterProjectList).toEqual(
      projectListReducer(undefined, action)
    );
  });

  test('Check that TOGGLE_FORM action works for formVisibleReducer and root reducer', () => {
    const action = {
      type: c.TOGGLE_FORM,
    };
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(
      formVisibleReducer(undefined, action)
    );
  });
});
