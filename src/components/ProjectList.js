import React from 'react';
import Project from './Project';

import PropTypes from 'prop-types';

function ProjectList(props) {
  return (
    <React.Fragment>
      <hr />
      {Object.values(props.projectList).map((project) => (
        <Project
          whenProjectClicked={props.onProjectSelection}
          name={project.name}
          duration={project.duration}
          instructions={project.instructions}
          formattedWaitTime={project.formattedWaitTime}
          id={project.id}
          key={project.id}
        />
      ))}
    </React.Fragment>
  );
}

ProjectList.propTypes = {
  projectList: PropTypes.object,
  onProjectSelection: PropTypes.func,
};

export default ProjectList;
