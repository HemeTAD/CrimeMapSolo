import { model, Schema } from "mongoose";

const addressSchema = new Schema({
  street: {
    type: String,
    required: [true, "Street Address is required."],
  },
  city: {
    type: String,
    required: [true, "City is required."],
  },
  state: {
    type: String,
    required: [true, "State is required."],
  },
  zip: {
    type: String,
    required: [true, "Zip Code is required."],
    minLength: [5,"Zip Code must be at least 5 characters."],
    maxLength: [5, "Zip Code must not exceed 5 characters."]
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "A Reporters name is required"],
    minLength: [5, "a Reporters name requires a minimum of 5 characters."],
    maxLength: [255, "A Reporters name exceeds 255 characters."],
  },
  CrimeType: {
    type: String,
    required: [true, "The type of crime is required."],
    max: [15, "The type of crime should not exceed 15 Characters"],
  },
  Description: {
    type: String,
    minLength: [15, "Crime description requires 15 characters."],
    maxLength: [40, "Crime Description should not exceed 40 characters."],
  },
  address: addressSchema,
}, { timestamps: true });

const Users = model("Users", userSchema); // Turns concept into a builder to make it a usable model
export default Users;