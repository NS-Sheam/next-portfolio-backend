import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const ExperienceSchema = new Schema(
  // Define the schema fields
  {
    designation: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Experience = model("Experience", ExperienceSchema);
