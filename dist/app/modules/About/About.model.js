"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.About = void 0;
var _mongoose = require("mongoose");
// Declare the Schema of the Mongo model
const AboutSchema = new _mongoose.Schema({
  // Define the schema fields
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  religion: {
    type: String,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  image: {
    type: String,
    // URL of the image
    required: true
  },
  skills: {
    type: [_mongoose.Schema.Types.ObjectId],
    ref: "Skill"
  },
  experience: {
    type: [_mongoose.Schema.Types.ObjectId],
    ref: "Experience"
  },
  education: {
    type: [_mongoose.Schema.Types.ObjectId],
    ref: "Education"
  },
  achievements: {
    type: [_mongoose.Schema.Types.ObjectId],
    ref: "Achievement"
  },
  hobbiesAndInterests: {
    type: [_mongoose.Schema.Types.ObjectId],
    ref: "HobbiesAndInterest"
  },
  languages: {
    type: [_mongoose.Schema.Types.ObjectId],
    ref: "Language"
  }
}, {
  timestamps: true
});

// Export the model
const About = exports.About = (0, _mongoose.model)("About", AboutSchema);