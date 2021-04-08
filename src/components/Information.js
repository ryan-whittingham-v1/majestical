import React from 'react';
import { connect } from 'react-redux';
import { findJob } from './../actions';
import firebase from 'firebase/app';
import { dataUpdated } from './../actions';
import { setCurrentJob } from './../actions';

class Information extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.airTable.staleData ||
      this.props.currentJob !== prevProps.currentJob
    ) {
      console.log('info updated: ' + this.props.currentJob);
      const { dispatch } = this.props;
      if (firebase.auth().currentUser) {
        dispatch(findJob(this.props.currentJob));
      }
    }
  }

  deleteJob = () => {
    const { dispatch } = this.props;
    var Airtable = require('airtable');
    var base = new Airtable({
      apiKey: `${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    }).base('app11sa0xLuE8WuG8');
    base('HOT TIPS!!').destroy(
      [this.props.airTable.data.id],
      function (err, deletedRecords) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted', deletedRecords.length, 'records');
        dispatch(setCurrentJob(0));
        dispatch(dataUpdated);
      }
    );
  };

  render() {
    const { error, isLoading, data } = this.props.airTable;
    const { currentUser } = this.props;
    if (currentUser.loggedIn) {
      if (error) {
        return <React.Fragment>Error: {error.message}</React.Fragment>;
      } else if (isLoading) {
        return <React.Fragment>Loading...</React.Fragment>;
      } else if (data.fields) {
        return (
          <React.Fragment>
            <h1>Job {data.fields.Job}</h1>
            <h2>{data.fields.Name}</h2>
            <p>{data.fields.Notes}</p>
            {/* <img src={data.fields.Image[0].url} alt="Me" /> */}
            <button onClick={this.deleteJob}>Delete</button>
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

export default connect(mapStateToProps)(Information);
