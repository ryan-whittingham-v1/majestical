import React from 'react';
import Project from './Project';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

function ProjectList(props) {
  useFirestoreConnect([{ collection: 'projects' }]);

  const projects = useSelector((state) => state.firestore.ordered.projects);
  if (isLoaded(projects)) {
    return (
      <React.Fragment>
        <hr />
        {projects.map((project) => {
          return (
            <Project
              whenProjectClicked={props.onProjectSelection}
              name={project.name}
              duration={project.duration}
              instructions={project.instructions}
              formattedWaitTime={project.formattedWaitTime}
              id={project.id}
              key={project.id}
            />
          );
        })}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    );
  }
}

ProjectList.propTypes = {
  onProjectSelection: PropTypes.func,
};

export default ProjectList;
