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
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Skill = model("Skill", SkillSchema);
