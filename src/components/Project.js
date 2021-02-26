import React from 'react';

import PropTypes from 'prop-types';

function Project(props) {
  return (
    <React.Fragment>
      <div onClick={() => props.whenProjectClicked(props.id)}>
        <h3>
          {props.name} - {props.duration}{' '}
          {props.duration > 1 ? 'hours' : 'hour'}
        </h3>
        <p>
          <em>{props.instructions}</em>
        </p>
        <p>
          <em>{props.formattedWaitTime}</em>
        </p>
        <hr />
      </div>
    </React.Fragment>
  );
}

Project.propTypes = {
  name: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  instructions: PropTypes.string.isRequired,
  id: PropTypes.string,
  whenProjectClicked: PropTypes.func,
  formattedWaitTime: PropTypes.string,
};

export default Project;
