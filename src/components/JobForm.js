import React from 'react';
import firebase from 'firebase/app';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as a from './../actions/index';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { act } from 'react-dom/test-utils';

export const JobForm = () => {
  const currentUser = useSelector((state) => state.userReducer);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  function addProjectToAirTable(event) {
    event.preventDefault();
    if (firebase.auth().currentUser) {
      var Airtable = require('airtable');
      var base = new Airtable({
        apiKey: `${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      }).base('app11sa0xLuE8WuG8');

      base('Jobs').create(
        [
          {
            fields: {
              Name: event.target.Name.value,
              dueDate: event.target.dueDate.value,
            },
          },
        ],
        function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          records.forEach(function (record) {
            console.log(record.getId());
          });
          dispatch(a.dataUpdated());
          event.target.Name.value = '';
          setOpen(false);
        }
      );
    } else {
      console.log('unathorized to create job');
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Add Job</Button>}
    >
      <Modal.Header>Add New Job</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <form onSubmit={addProjectToAirTable}>
            <input type="text" name="Name" placeholder="Name" />
            <input type="date" name="dueDate" />

            <button type="submit">Save</button>
          </form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default JobForm;
