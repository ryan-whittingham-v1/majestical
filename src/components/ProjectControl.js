import React from 'react';
import NewProjectForm from './NewProjectForm';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import EditProjectForm from './EditProjectForm';
import { connect } from 'react-redux';
import * as a from './../actions/index';

class ProjectControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProject: null,
      editing: false,
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(
      () => this.updateProjectWaitTime(),
      60000
    );
  }

  componentDidUpdate() {
    console.log('component updated!');
  }

  componentWillUnmount() {
    console.log('component unmounted!');
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateProjectWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.masterProjectList).forEach((project) => {
      const newFormattedWaitTime = project.timeOpen.fromNow(true);
      const action = a.updateTime(project.id, newFormattedWaitTime);
      dispatch(action);
    });
  };

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

  handleAddingNewProjectToList = (newProject) => {
    const { dispatch } = this.props;
    const { id, name, duration, instructions } = newProject;
    const action = a.addProject(newProject);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  };

  handleChangingSelectedProject = (id) => {
    const selectedProject = this.props.masterProjectList[id];
    this.setState({ selectedProject: selectedProject });
  };

  handleDeletingProject = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteProject(id);
    dispatch(action);
    this.setState({ selectedProject: null });
  };

  handleEditClick = () => {
    this.setState({ editing: true });
  };

  handleEditingProjectInList = (projectToEdit) => {
    const { dispatch } = this.props;
    const action = a.addProject(projectToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedProject: null,
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
    } else if (this.props.formVisibleOnPage) {
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
    masterProjectList: state.masterProjectList,
    formVisibleOnPage: state.formVisibleOnPage,
  };
};

ProjectControl = connect(mapStateToProps)(ProjectControl);

export default ProjectControl;
