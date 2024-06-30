import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const AboutSchema = new Schema(
  {
    // Define the schema fields
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL of the image
      required: true,
    },
    skills: {
      type: [Schema.Types.ObjectId],
      ref: "Skill",
    },
    experience: {
      type: [Schema.Types.ObjectId],
      ref: "Experience",
    },
    education: {
      type: [Schema.Types.ObjectId],
      ref: "Education",
    },
    achievements: {
      type: [Schema.Types.ObjectId],
      ref: "Achievement",
    },
    hobbiesAndInterests: {
      type: [Schema.Types.ObjectId],
      ref: "HobbiesAndInterest",
    },
    languages: {
      type: [Schema.Types.ObjectId],
      ref: "Language",
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const About = model("About", AboutSchema);
