import * as c from './ActionTypes';

export const deleteProject = (id) => ({
  type: c.DELETE_PROJECT,
  id,
});

export const toggleForm = () => ({
  type: c.TOGGLE_FORM,
});

export const updateTime = (id, formattedWaitTime) => ({
  type: c.UPDATE_TIME,
  id: id,
  formattedWaitTime: formattedWaitTime,
});

export const requestData = () => ({
  type: c.REQUEST_DATA,
});

export const getDataSuccess = (data) => ({
  type: c.GET_DATA_SUCCESS,
  data,
});

export const getDataFailure = (error) => ({
  type: c.GET_DATA_FAILURE,
  error,
});

export const setUser = () => {
  return {
    type: 'SET_USER',
  };
};

export const logOut = () => {
  return {
    type: 'LOG_OUT',
  };
};

export const setCurrentJob = (data) => ({
  type: c.SET_CURRENT_JOB,
  data,
});

export const dataUpdated = () => ({
  type: c.DATA_UPDATED,
});

export const makeApiCall = () => {
  var Airtable = require('airtable');
  var base = new Airtable({
    apiKey: `${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  }).base('app11sa0xLuE8WuG8');
  return (dispatch) => {
    dispatch(requestData);
    return base('Job')
      .find('recPpaRBCoADziMPO')
      .then((response) => {
        dispatch(getDataSuccess(response));
      })
      .catch((error) => {
        dispatch(getDataFailure(error));
      });
  };
};

export const findJob = (job) => {
  let matchingJob;
  var Airtable = require('airtable');
  var base = new Airtable({
    apiKey: `${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  }).base('app11sa0xLuE8WuG8');
  return (dispatch) => {
    dispatch(requestData);
    return base('Job')
      .select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 100,
        view: 'Grid view',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(function (record) {
            if (record.get('Job') === job) {
              console.log('Retrieved', record.get('record'));
              matchingJob = record;
              return;
            }
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (matchingJob) {
            dispatch(getDataSuccess(matchingJob));
            return;
          }
          if (err) {
            console.error(err);
            return;
          }
          console.log('No job with that number');
          dispatch(getDataFailure());
          return;
        }
      );
  };
};

export function getJobList() {
  console.log('getJobList fired');
  let jobList = [];
  var Airtable = require('airtable');
  var base = new Airtable({
    apiKey: `${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  }).base('app11sa0xLuE8WuG8');
  return (dispatch) => {
    dispatch(requestData);
    return base('Job')
      .select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 500,
        view: 'Grid view',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(function (record) {
            console.log('Retrieved', record.get('record'));
            jobList.push(record);
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
          console.log('finished getList');
          dispatch(getDataSuccess(jobList));
          return;
        }
      );
  };
}
