import projectListReducer from '../../reducers/project-list-reducer';
import * as c from './../../actions/ActionTypes';
import Moment from 'moment';

describe('projectListReducer', () => {
  let action;
  const projectData = {
    name: 'Vortex',
    duration: 1,
    instructions: '4x8 13oz Scrim with hem and grommets.',
    timeOpen: 0,
    id: 1,
  };
  const currentState = {
    1: {
      name: 'Vortex',
      duration: 1,
      instructions: '4x8 13oz banners with hem and grommets',
      id: 1,
    },
    2: { name: 'Watertech', duration: 2, instructions: 'Glossy decals', id: 2 },
  };
  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(projectListReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully delete a ticket', () => {
    action = {
      type: c.DELETE_PROJECT,
      id: 1,
    };
    expect(projectListReducer(currentState, action)).toEqual({
      2: {
        name: 'Watertech',
        duration: 2,
        instructions: 'Glossy decals',
        id: 2,
      },
    });
  });

  test('Should add a formatted time to the project', () => {
    const { name, duration, instructions, timeOpen, id } = projectData;
    action = {
      type: c.UPDATE_TIME,
      formattedWaitTime: '4 minutes',
      id: id,
    };
    expect(projectListReducer({ [id]: projectData }, action)).toEqual({
      [id]: {
        name: name,
        duration: duration,
        instructions: instructions,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: '4 minutes',
      },
    });
  });

  test('should successfully add a project to the project list that includes Moment-formatted wait times', () => {
    const { name, duration, instructions, timeOpen, id } = projectData;
    action = {
      type: c.ADD_PROJECT,
      name: name,
      duration: duration,
      instructions: instructions,
      timeOpen: timeOpen,
      id: id,
      formattedWaitTime: new Moment().fromNow(true),
    };
    expect(projectListReducer({}, action)).toEqual({
      [id]: {
        name: name,
        duration: duration,
        instructions: instructions,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: 'a few seconds',
      },
    });
  });
});
