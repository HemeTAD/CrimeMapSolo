import { useEffect, useState } from "react";
import { deleteUserById, getUserById } from "../services/userService";
import {  useNavigate, useParams } from "react-router-dom";


const singleUserDisplay = ({ setTitle}) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById(id)
      .then((res) => {
        setUser(res);
        console.log(res)
        setTitle(`${res.CrimeType}`);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const deleteReport = (id) => {
    deleteUserById(id).then(navigate("/"));
  };

  return (
    user && (
      <div className="SingleDisp">
              <p>{`Name of witness/Reporter:${user.name} `}</p>
              <h2>Crime Type</h2>
              <p>{user.CrimeType}</p>
              <h2>Description</h2>
              <p>{user.Description}</p>
              <h2>Location</h2>
              <p>{user?.address?.street}</p>
              <p>{user?.address?.city}</p>
              <p>{user?.address?.state}</p>
              <p>{user?.address?.zip}</p>
              <button onClick={() => deleteReport(id)}>Delete Report!</button>
      </div>
    )
  );
};

export default singleUserDisplay;
