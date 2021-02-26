import * as c from './ActionTypes';

export const deleteProject = (id) => ({
  type: c.DELETE_PROJECT,
  id,
});

export const toggleForm = () => ({
  type: c.TOGGLE_FORM,
});

export const addProject = (project) => {
  const {
    name,
    duration,
    instructions,
    id,
    formattedWaitTime,
    timeOpen,
  } = project;
  return {
    type: c.ADD_PROJECT,
    name: name,
    duration: duration,
    instructions: instructions,
    formattedWaitTime,
    timeOpen,
    id: id,
  };
};

export const updateTime = (id, formattedWaitTime) => ({
  type: c.UPDATE_TIME,
  id: id,
  formattedWaitTime: formattedWaitTime,
});
