import React from 'react';
import { connect } from 'react-redux';
import { findJob, getJobList } from './../actions';
import firebase from 'firebase/app';
import Job from './Job';

class JobList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (firebase.auth().currentUser) {
      dispatch(getJobList());
    }
  }

  componentDidUpdate() {
    if (this.props.airTable.staleData) {
      const { dispatch } = this.props;
      if (firebase.auth().currentUser) {
        dispatch(getJobList());
      }
    }
  }

  render() {
    const { error, isLoading, data } = this.props.airTable;
    const { currentUser } = this.props;
    if (currentUser.loggedIn) {
      if (error) {
        return <React.Fragment>Error: {error.message}</React.Fragment>;
      } else if (isLoading) {
        return <React.Fragment>Loading...</React.Fragment>;
      } else if (data.length > 0) {
        return (
          <React.Fragment>
            <h1>Job List</h1>
            {data.map((job) => {
              return (
                <Job
                  Job={job.fields.Number}
                  Name={job.fields.Name}
                  dueDate={job.fields.dueDate}
                  parts={job.fields.Parts}
                  key={job.fields.record}
                  id={job.fields.record}
                />
              );
            })}
          </React.Fragment>
        );
      } else {
        return <div></div>;
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    airTable: state.airTableReducer,
    isLoading: state.airTableReducer.isLoading,
    error: state.airTableReducer.error,
    currentUser: state.userReducer,
    currentJob: state.currentJobReducer.data,
  };
};

export default connect(mapStateToProps)(JobList);
