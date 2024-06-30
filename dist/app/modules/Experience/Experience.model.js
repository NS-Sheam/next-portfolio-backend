"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Experience = void 0;
var _mongoose = require("mongoose");
// Declare the Schema of the Mongo model
const ExperienceSchema = new _mongoose.Schema(
// Define the schema fields
{
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Export the model
const Experience = exports.Experience = (0, _mongoose.model)("Experience", ExperienceSchema);