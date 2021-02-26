import React from 'react';

import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import ReusableForm from './ReusableForm';
import Moment from 'moment';

function NewProjectForm(props) {
  function handleNewProjectFormSubmission(event) {
    event.preventDefault();
    props.onNewProjectCreation({
      name: event.target.name.value,
      duration: parseInt(event.target.duration.value),
      instructions: event.target.instructions.value,
      id: v4(),
      timeOpen: new Moment(),
      formattedWaitTime: new Moment().fromNow(true),
    });
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleNewProjectFormSubmission}
        buttonText="Add Project"
      />
    </React.Fragment>
  );
}

NewProjectForm.propTypes = {
  onNewProjectCreation: PropTypes.func,
};

export default NewProjectForm;
