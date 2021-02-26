import * as actions from './../../../actions/index';
import * as c from './../../../actions/ActionTypes';

describe('help queue actions', () => {
  it('deleteProject should create DELETE_PROJECT action', () => {
    expect(actions.deleteProject(1)).toEqual({
      type: c.DELETE_PROJECT,
      id: 1,
    });
  });

  it('toggleForm should create TOGGLE_FORM action', () => {
    expect(actions.toggleForm()).toEqual({
      type: c.TOGGLE_FORM,
    });
  });

  it('addProject should create ADD_PROJECT action', () => {
    expect(
      actions.addProject({
        name: 'Vortex Banners',
        duration: 2,
        instructions: '4x8 13oz with hems and grommets',
        timeOpen: 0,
        formattedWaitTime: 'A few seconds',
        id: 1,
      })
    ).toEqual({
      type: c.ADD_PROJECT,
      name: 'Vortex Banners',
      duration: 2,
      instructions: '4x8 13oz with hems and grommets',
      timeOpen: 0,
      formattedWaitTime: 'A few seconds',
      id: 1,
    });
  });
  it('updateTime should create UPDATE_TIME action', () => {
    expect(actions.updateTime(1, 'A few seconds')).toEqual({
      type: c.UPDATE_TIME,
      id: 1,
      formattedWaitTime: 'A few seconds',
    });
  });
});
