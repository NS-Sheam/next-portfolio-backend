import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const ProjectSchema = new Schema(
  {
    // Define the schema fields
    name: {
      type: String,
      required: true,
    },
    technology: {
      type: [String],
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    clientSite: {
      type: String,
    },
    serverSite: {
      type: String,
    },
    liveSite: {
      type: String,
    },
    image: {
      type: String, // URL of the image
    },
    basedOn: {
      type: [String],
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
export const Project = model("Project", ProjectSchema);
