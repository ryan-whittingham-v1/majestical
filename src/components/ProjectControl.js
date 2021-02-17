import React from 'react';
import NewProjectForm from './NewProjectForm';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import EditProjectForm from './EditProjectForm';
import { connect } from 'react-redux';

class ProjectControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      selectedProject: null,
      editing: false,
    };
  }

  handleClick = () => {
    if (this.state.selectedProject != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedProject: null,
        editing: false,
      });
    } else {
      this.setState((prevState) => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  };

  handleAddingNewProjectToList = (newProject) => {
    const { dispatch } = this.props;
    const { id, name, duration, instructions } = newProject;
    const action = {
      type: 'ADD_PROJECT',
      id: id,
      name: name,
      duration: duration,
      instructions: instructions,
    };
    dispatch(action);
    this.setState({ formVisibleOnPage: false });
  };

  handleChangingSelectedProject = (id) => {
    const selectedProject = this.props.masterProjectList[id];
    this.setState({ selectedProject: selectedProject });
  };

  handleDeletingProject = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_PROJECT',
      id: id,
    };
    dispatch(action);
    this.setState({ selectedProject: null });
  };

  handleEditClick = () => {
    this.setState({ editing: true });
  };

  handleEditingProjectInList = (projectToEdit) => {
    const { dispatch } = this.props;
    const { id, name, duration, instructions } = projectToEdit;
    const action = {
      type: 'ADD_PROJECT',
      id: id,
      name: name,
      duration: duration,
      instructions: instructions,
    };
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null,
    });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

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
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewProjectForm
          onNewProjectCreation={this.handleAddingNewProjectToList}
        />
      );
      buttonText = 'Return to Project List';
    } else {
      currentlyVisibleState = (
        <ProjectList
          projectList={this.props.masterProjectList}
          onProjectSelection={this.handleChangingSelectedProject}
        />
      );

      buttonText = 'Add Project';
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
    masterProjectList: state,
  };
};

ProjectControl = connect(mapStateToProps)(ProjectControl);

export default ProjectControl;
