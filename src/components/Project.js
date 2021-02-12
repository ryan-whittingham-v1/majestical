import React from 'react';

import PropTypes from 'prop-types';

function Project(props) {
  return (
    <React.Fragment>
      <h3>
        {props.name} - {props.duration} {props.duration > 1 ? 'hours' : 'hour'}
      </h3>
      <p>
        <em>{props.instructions}</em>
      </p>
      <hr />
    </React.Fragment>
  );
}

Project.propTypes = {
  name: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  instructions: PropTypes.string.isRequired,
};

export default Project;
