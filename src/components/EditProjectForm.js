import React from 'react';
import ReusableForm from './ReusableForm';
import PropTypes from 'prop-types';

function EditProjectForm(props) {
  const { project } = props;

  function handleEditProjectFormSubmission(event) {
    event.preventDefault();
    props.onEditProject({
      name: event.target.name.value,
      duration: parseInt(event.target.duration.value),
      instructions: event.target.instructions.value,
      id: project.id,
      timeOpen: project.timeOpen,
      formattedWaitTime: project.formattedWaitTime,
    });
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleEditProjectFormSubmission}
        buttonText="Update Project"
      />
    </React.Fragment>
  );
}

EditProjectForm.propTypes = {
  project: PropTypes.object,
  onEditProject: PropTypes.func,
};

export default EditProjectForm;
