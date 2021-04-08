import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as a from '../actions/index';

function SelectJobForm() {
  const dispatch = useDispatch();

  function handleFormSubmit(event) {
    event.preventDefault();
    dispatch(a.setCurrentJob(parseInt(event.target.job.value)));
    event.target.job.value = '';
  }

  return (
    <React.Fragment>
      <form onSubmit={handleFormSubmit}>
        <input type="number" name="job" placeholder="job" />
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}

export default SelectJobForm;
