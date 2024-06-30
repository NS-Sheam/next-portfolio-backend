import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const HobbySchema = new Schema(
  {
    // Define the schema fields
    name: {
      type: String,
      required: true,
    },
    passionLevel: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Hobby = model("Hobby", HobbySchema);
