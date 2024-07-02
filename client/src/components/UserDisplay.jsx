import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../services/userService';
import MapDisplay from './MapDisplay';
import {format} from 'date-fns';

const UserDisplay = ({ setTitle }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res);
        console.log(res)
        setTitle("Guardian Angel");
      })
      .catch((error) => console.log(error));
  }, [setTitle]);

  return (
    <>
      <div className="box_container">
        {users.map(({ name, CrimeType, Description, address, _id, createdAt }) => (
          <div className="content-container" key={_id}>
            <h2>Crime Report</h2>
            <p className="name_display">
              <Link to={`/${_id}/details`}>{CrimeType}</Link>
            </p>
            <p>
              <Link to={`/${_id}/edit`}>Edit</Link>
            </p>
            <h2>Reported By:</h2>
            <p>name: {name}</p>
            <h2>Crime Description:</h2>
            <p>{Description}</p>
            <h2>Location:</h2>
            <p>{`${address.street}, ${address.city}, ${address.state}, ${address.zip}`}</p>
            <h2>Date/Time</h2>
            <p>{format(new Date(createdAt), 'MM-dd-yyyy hh:mm:ss a')}</p>
            <Link to={`/map/${_id}`}>View on Map</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserDisplay;

