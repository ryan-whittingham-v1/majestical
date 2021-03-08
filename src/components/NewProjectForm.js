import React from 'react';

//import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import ReusableForm from './ReusableForm';
//import Moment from 'moment';
import { useFirestore } from 'react-redux-firebase';

function NewProjectForm(props) {
  const firestore = useFirestore();

  function addProjectToFirestore(event) {
    event.preventDefault();
    props.onNewProjectCreation();
    return firestore.collection('projects').add({
      name: event.target.name.value,
      duration: parseInt(event.target.duration.value),
      instructions: event.target.instructions.value,
      timeOpen: firestore.FieldValue.serverTimestamp(),
    });
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={addProjectToFirestore}
        buttonText="Add Project"
      />
    </React.Fragment>
  );
}

NewProjectForm.propTypes = {
  onNewProjectCreation: PropTypes.func,
};

export default NewProjectForm;
