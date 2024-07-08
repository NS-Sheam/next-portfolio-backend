import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const AchievementSchema = new Schema(
  {
    // Define the schema fields
    title: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    certificate: {
      type: String,
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
export const Achievement = model("Achievement", AchievementSchema);
