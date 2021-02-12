import React from 'react';
import NewProjectForm from './NewProjectForm';
import ProjectList from './ProjectList';

class ProjectControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formVisibleOnPage: false, masterProjectList: [] };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      formVisibleOnPage: !prevState.formVisibleOnPage,
    }));
  };

  handleAddingNewProjectToList = (newProject) => {
    const newMasterProjectList = this.state.masterProjectList.concat(
      newProject
    );
    this.setState({
      masterProjectList: newMasterProjectList,
      formVisibleOnPage: false,
    });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewProjectForm
          onNewProjectCreation={this.handleAddingNewProjectToList}
        />
      );
      buttonText = 'Return to Project List';
    } else {
      currentlyVisibleState = (
        <ProjectList projectList={this.state.masterProjectList} />
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

export default ProjectControl;
