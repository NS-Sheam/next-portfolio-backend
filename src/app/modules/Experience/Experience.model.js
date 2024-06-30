import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const ExperienceSchema = new Schema(
  // Define the schema fields
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Experience = model("Experience", ExperienceSchema);
