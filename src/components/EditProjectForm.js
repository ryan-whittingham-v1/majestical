import React from 'react';
import ReusableForm from './ReusableForm';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

function EditProjectForm(props) {
  const { project } = props;

  const firestore = useFirestore();

  function handleEditProjectFormSubmission(event) {
    event.preventDefault();
    props.onEditProject();
    const propertiesToUpdate = {
      name: event.target.name.value,
      duration: event.target.duration.value,
      instructions: event.target.instructions.value,
    };
    console.log(event.target);
    return firestore.update(
      { collection: 'projects', doc: project.id },
      propertiesToUpdate
    );
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
