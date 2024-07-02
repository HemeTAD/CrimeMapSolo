import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getUserById } from "../services/userService";

const UserForm = ({ submitFunction, setTitle }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState({
    name: "",
    CrimeType: "",
    Description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      getUserById(id).then((res) => {
        setUser(res);
        setTitle(`Edit ${res.CrimeType}`);
      });
    } else {
      setTitle("Guardian Angel");
    }
  }, [id, setTitle]);

  const updateUser = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
      validateUserInfo(name, value);
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
      validateUserInfo(name, value);
    }
  };

  const validateUserInfo = (name, value) => {
    const validations = {
      name: (value) => value.length >= 5 ? true : "Name must be at least 5 characters long.",
      CrimeType: (value) => value.length >= 5 ? true : "Crime Type must be at least 5 characters long.",
      Description: (value) => value.length >= 15 ? true : "Description must be at least 15 characters long.",
      "address.street": (value) => value.length >= 5 ? true : "Street must be at least 5 characters long.",
      "address.city": (value) => value.length >= 5 ? true : "City must be at least 5 characters long.",
      "address.state": (value) => value.length >= 2 ? true : "State must be at least 2 characters long.",
      "address.zip": (value) => value.length === 5 ? true : "Zip code must be exactly 5 characters long.",
    };
    if (validations[name]) {
      setErrors((prev) => ({ ...prev, [name]: validations[name](value) }));
    } else {
      console.error(`Validation function for '${name}' not found.`);
    }
  };

  const readyForm = () => {
    return Object.values(errors).every((error) => error === true);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!readyForm()) {
      alert("Please make corrections");
      return;
    }
    submitFunction(user)
      .then(() => {
        setUser({
          name: "",
          CrimeType: "",
          Description: "",
          address: {
            street: "",
            city: "",
            state: "",
            zip: "",
          },
        });
        navigate("/reports");
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  const isEditMode = location.pathname.includes("/edit");

  return (
    <div className="form-container">
      <form onSubmit={submitForm}>
        <label>
          Name
          <input
            type="text"
            name="name"
            onChange={updateUser}
            value={user.name}
          />
          {errors.name && errors.name !== true && (
            <p className="error-message">{errors.name}</p>
          )}
        </label>
        <label>
          Crime Type
          <input
            type="text"
            name="CrimeType"
            onChange={updateUser}
            value={user.CrimeType}
          />
          {errors.CrimeType && errors.CrimeType !== true && (
            <p className="error-message">{errors.CrimeType}</p>
          )}
        </label>
        <label>
          Description
          <input
            type="text"
            name="Description"
            onChange={updateUser}
            value={user.Description}
          />
          {errors.Description && errors.Description !== true && (
            <p className="error-message">{errors.Description}</p>
          )}
        </label>
        <label>
          Street
          <input
            type="text"
            name="address.street"
            onChange={updateUser}
            value={user.address.street}
          />
          {errors["address.street"] && errors["address.street"] !== true && (
            <p className="error-message">{errors["address.street"]}</p>
          )}
        </label>
        <label>
          City
          <input
            type="text"
            name="address.city"
            onChange={updateUser}
            value={user.address.city}
          />
          {errors["address.city"] && errors["address.city"] !== true && (
            <p className="error-message">{errors["address.city"]}</p>
          )}
        </label>
        <label>
          State
          <input
            type="text"
            name="address.state"
            onChange={updateUser}
            value={user.address.state}
          />
          {errors["address.state"] && errors["address.state"] !== true && (
            <p className="error-message">{errors["address.state"]}</p>
          )}
        </label>
        <label>
          Zip
          <input
            type="number"
            name="address.zip"
            onChange={updateUser}
            value={user.address.zip}
          />
          {errors["address.zip"] && errors["address.zip"] !== true && (
            <p className="error-message">{errors["address.zip"]}</p>
          )}
        </label>
        <button type="submit">{isEditMode ? "Update Report" : "Report Crime"}</button>
      </form>
    </div>
  );
};

export default UserForm;
