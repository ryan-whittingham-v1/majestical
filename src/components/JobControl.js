import React from 'react';
import { useSelector } from 'react-redux';
import SelectJobForm from './SelectJobForm';
import Information from './Information';
import JobForm from './JobForm';
import JobList from './JobList';

export const JobControl = () => {
  const user = useSelector((state) => state.userReducer.loggedIn); // Check if user is logged in

  let visibleState = <div></div>;
  if (user) {
    visibleState = (
      <div>
        <JobForm />
        <JobList />
      </div>
    );
  }
  return visibleState;
};

export default JobControl;
