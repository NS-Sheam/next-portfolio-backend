import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const HobbiesAndInterestSchema = new Schema(
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
export const HobbiesAndInterest = model("HobbiesAndInterest", HobbiesAndInterestSchema);
