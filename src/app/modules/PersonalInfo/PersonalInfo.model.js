import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const PersonalInfoSchema = new Schema(
  {
    // Define the schema fields
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL of the image
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const PersonalInfo = model("PersonalInfo", PersonalInfoSchema);
