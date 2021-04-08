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
    let activities = [];
    if (event.target.UV.checked) {
      activities.push('receomA9RGVZlVduL');
    }
    if (event.target.CNC.checked) {
      activities.push('recNfMOQzVpjPevh1');
    }
    if (event.target.EcoSolvent.checked) {
      activities.push('recfUeOJtcE5aJQhy');
    }
    if (event.target.Laminating.checked) {
      activities.push('recLZpwTm8h1HkM2t');
    }
    if (firebase.auth().currentUser) {
      var Airtable = require('airtable');
      var base = new Airtable({
        apiKey: `${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      }).base('app11sa0xLuE8WuG8');

      base('Job').create(
        [
          {
            fields: {
              Name: event.target.Name.value,
              dueDate: event.target.dueDate.value,
              Activities: activities,
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
            <fieldset>
              <legend>Activites</legend>
              <div>
                <input type="checkbox" name="UV" value="UV Print" />
                <label for="UV">UV Print</label>
              </div>
              <div>
                <input type="checkbox" name="CNC" value="CNC" />
                <label for="CNC">CNC</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="EcoSolvent"
                  value="Eco-Solvent Print"
                />
                <label for="Eco-Solvent Print">Eco-Solvent Print</label>
              </div>
              <div>
                <input type="checkbox" name="Laminating" value="Laminating" />
                <label for="Laminating">Laminating</label>
              </div>
            </fieldset>
            <button type="submit">Save</button>
          </form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default JobForm;
