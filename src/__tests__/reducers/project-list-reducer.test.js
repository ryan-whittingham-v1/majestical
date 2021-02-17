import projectListReducer from '../../reducers/project-list-reducer';

describe('projectListReducer', () => {
  let action;
  const projectData = {
    name: 'Vortex',
    duration: 1,
    instructions: '4x8 13oz Scrim with hem and grommets.',
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

  test('Should successfully add new project data to masterProjectList', () => {
    const { name, duration, instructions, id } = projectData;
    action = {
      type: 'ADD_PROJECT',
      name: name,
      duration: duration,
      instructions: instructions,
      id: id,
    };

    expect(projectListReducer({}, action)).toEqual({
      [id]: {
        name: name,
        duration: duration,
        instructions: instructions,
        id: id,
      },
    });
  });

  test('Should successfully delete a ticket', () => {
    action = {
      type: 'DELETE_PROJECT',
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
});
