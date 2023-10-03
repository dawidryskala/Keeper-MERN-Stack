import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Record = (props) => (
  <div className="note">
    <h1>{props.record.title}</h1>
    <p>{props.record.content}</p>
    <div className="edit-delete-div">
      <div>
        <EditIcon className="edit-link" />
        <Link className="edit-link" to={`/edit/${props.record._id}`}>Edit</Link>
      </div>

      <div>

        <button className="delete-button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        > <DeleteIcon />
          Delete
        </button>
      </div>
    </div>

  </div>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <div>{recordList()}</div>
    </div>
  );
}