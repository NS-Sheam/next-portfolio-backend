import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const LanguageSchema = new Schema(
  {
    // Define the schema fields
    name: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
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
export const Language = model("Language", LanguageSchema);
