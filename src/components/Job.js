import React from 'react';
import { Card, Modal } from 'semantic-ui-react';
import { setCurrentJob } from './../actions';
import { dataUpdated } from './../actions';
import { useDispatch } from 'react-redux';
import styles from '../styles/job.module.css';
import { getPart } from './../actions';
import { useSelector } from 'react-redux';

export const Job = (props) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  function deleteJob() {
    console.log({ props });
    var Airtable = require('airtable');
    var base = new Airtable({
      apiKey: `${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    }).base('app11sa0xLuE8WuG8');
    base('Jobs').destroy([props.id], function (err, deletedRecords) {
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
  function openModal() {
    dispatch(getPart(props.parts[0]));
    setOpen(true);
  }

  let parts = useSelector((state) => state.partsReducer);

  let partsMessage = <p>Loading Parts...</p>;
  if (!parts.isLoading) {
    partsMessage = parts.data.fields.Name;
  }

  let dueDate = Date.parse(props.dueDate + 'T00:00');
  let dateNow = Date.now();
  let days = Math.ceil((dueDate - dateNow) / 86400000);
  let dateMessage;
  let cardColor;
  if (days < 0) {
    dateMessage = <p>PAST DUE</p>;
    cardColor = styles.pastDue;
  } else if (days === 0) {
    dateMessage = <p>Today</p>;
    cardColor = styles.onTime;
  } else if (days === 1) {
    dateMessage = <p>Tomorrow</p>;
    cardColor = styles.onTime;
  } else {
    dateMessage = <p>{days} Days From Now</p>;
    cardColor = styles.onTime;
  }

  return (
    <div onClick={openModal}>
      <Card>
        <Card.Content>
          <Card.Header className={cardColor}>
            {props.Name} - {props.Job}
          </Card.Header>
          <em>
            Due: {props.dueDate} {dateMessage}
          </em>
        </Card.Content>
      </Card>

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header className={cardColor}>{props.Job}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>{props.Name}</p>
            {dateMessage}
            {partsMessage}
          </Modal.Description>
          <button onClick={deleteJob}>Delete</button>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Job;
