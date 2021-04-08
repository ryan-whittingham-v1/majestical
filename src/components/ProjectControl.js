import React from 'react';
import NewProjectForm from './NewProjectForm';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import EditProjectForm from './EditProjectForm';
import Information from './Information';

import { connect } from 'react-redux';
import * as a from './../actions/index';
import { withFirestore, isLoaded } from 'react-redux-firebase';

class ProjectControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProject: null,
      editing: false,
    };
  }

  handleClick = () => {
    if (this.state.selectedProject != null) {
      this.setState({
        selectedProject: null,
        editing: false,
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  };

  handleAddingNewProjectToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  };

  handleChangingSelectedProject = (id) => {
    this.props.firestore
      .get({ collection: 'projects', doc: id })
      .then((project) => {
        const firestoreProject = {
          name: project.get('name'),
          duration: project.get('duration'),
          instructions: project.get('instructions'),
          id: project.id,
        };
        this.setState({ selectedProject: firestoreProject });
      });
  };

  handleDeletingProject = (id) => {
    this.props.firestore.delete({ collection: 'projects', doc: id });
    this.setState({ selectedProject: null });
  };

  handleEditClick = () => {
    this.setState({ editing: true });
  };

  handleEditingProjectInList = () => {
    this.setState({
      editing: false,
      selectedProject: null,
    });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    const auth = this.props.firebase.auth();

    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      );
    }
    if (isLoaded(auth) && auth.currentUser == null) {
      return <React.Fragment></React.Fragment>;
    }
    if (isLoaded(auth) && auth.currentUser != null) {
      if (this.state.editing) {
        currentlyVisibleState = (
          <EditProjectForm
            project={this.state.selectedProject}
            onEditProject={this.handleEditingProjectInList}
          />
        );
        buttonText = 'Return to Project List';
      } else if (this.state.selectedProject != null) {
        currentlyVisibleState = (
          <ProjectDetail
            project={this.state.selectedProject}
            onClickingDelete={this.handleDeletingProject}
            onClickingEdit={this.handleEditClick}
          />
        );
        buttonText = 'Return to Project List';
      } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = (
          <NewProjectForm
            onNewProjectCreation={this.handleAddingNewProjectToList}
          />
        );
        buttonText = 'Return to Project List';
      } else {
        currentlyVisibleState = (
          <React.Fragment>
            <ProjectList
              projectList={this.props.masterProjectList}
              onProjectSelection={this.handleChangingSelectedProject}
            />
            <Information />
          </React.Fragment>
        );

        buttonText = 'Add Project';
      }
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    formVisibleOnPage: state.formVisibleOnPage,
  };
};

ProjectControl = connect(mapStateToProps)(ProjectControl);

export default withFirestore(ProjectControl);
