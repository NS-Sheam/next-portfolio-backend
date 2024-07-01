import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const EducationSchema = new Schema(
  // Define the schema fields
  {
    institution: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    position: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Education = model("Education", EducationSchema);
