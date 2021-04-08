import React from 'react';
import { Card, Modal } from 'semantic-ui-react';
import { setCurrentJob } from './../actions';
import { dataUpdated } from './../actions';
import { useDispatch } from 'react-redux';

export const Job = (props) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  function deleteJob() {
    console.log({ props });
    var Airtable = require('airtable');
    var base = new Airtable({
      apiKey: `${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    }).base('app11sa0xLuE8WuG8');
    base('Job').destroy([props.id], function (err, deletedRecords) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Deleted', deletedRecords.length, 'records');
      dispatch(setCurrentJob(0));
      dispatch(dataUpdated());
      setOpen(false);
    });
  }

  let activities;
  if (props.activityList) {
    activities = (
      <div>
        {props.activityList.map((activity) => {
          return <p>{activity}</p>;
        })}
      </div>
    );
  }

  let dueDate = Date.parse(props.dueDate + 'T00:00');
  let dateNow = Date.now();
  let days = Math.ceil((dueDate - dateNow) / 86400000);
  let dateMessage;
  if (days < 0) {
    dateMessage = <p>Past due!</p>;
  } else if (days === 0) {
    dateMessage = <p>Due today!</p>;
  } else if (days === 1) {
    dateMessage = <p>Due tomorrow.</p>;
  } else {
    dateMessage = <p>Due in {days} days.</p>;
  }

  return (
    <div onClick={() => setOpen(true)}>
      <Card>
        <Card.Content>
          <Card.Header>{props.Job}</Card.Header>
          <Card.Meta>{props.dueDate}</Card.Meta>
          <Card.Description>{props.Name}</Card.Description>
          <h3>Activities</h3>
          {activities}
        </Card.Content>
      </Card>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>{props.Job}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>{props.Name}</p>
            {dateMessage}
            <h3>Activities</h3>
            {activities}
          </Modal.Description>
          <button onClick={deleteJob}>Delete</button>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Job;
