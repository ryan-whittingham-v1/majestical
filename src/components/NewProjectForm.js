import React from 'react';

import { v4 } from 'uuid';
import PropTypes from 'prop-types';

function NewProjectForm(props) {
  function handleNewProjectFormSubmission(event) {
    event.preventDefault();
    props.onNewProjectCreation({
      name: event.target.name.value,
      duration: parseInt(event.target.duration.value),
      instructions: event.target.instructions.value,
      id: v4(),
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleNewProjectFormSubmission}>
        <input type="text" name="name" placeholder="Name" />
        <input type="number" name="duration" placeholder="Duration" />
        <textarea name="instructions" placeholder="Instructions" />
        <button type="submit">Add</button>
      </form>
    </React.Fragment>
  );
}

NewProjectForm.propTypes = {
  onNewProjectCreation: PropTypes.func,
};

export default NewProjectForm;
