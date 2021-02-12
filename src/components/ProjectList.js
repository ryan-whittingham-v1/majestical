import React from 'react';
import Project from './Project';

import PropTypes from 'prop-types';

function ProjectList(props) {
  return (
    <React.Fragment>
      <hr />
      {props.projectList.map((project, index) => (
        <Project
          name={project.name}
          duration={project.duration}
          instructions={project.instructions}
          key={index}
        />
      ))}
    </React.Fragment>
  );
}

ProjectList.propTypes = {
  projectList: PropTypes.array,
};

export default ProjectList;
