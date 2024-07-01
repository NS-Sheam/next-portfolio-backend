import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const SkillSchema = new Schema(
  {
    // Define the schema fields
    name: {
      type: String,
      required: true,
    },
    proficiency: {
      type: String,
      required: true,
    },
    technology: {
      type: String,
    },
    position: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Skill = model("Skill", SkillSchema);
