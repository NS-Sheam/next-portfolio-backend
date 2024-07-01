"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Education = void 0;
var _mongoose = require("mongoose");
// Declare the Schema of the Mongo model
const EducationSchema = new _mongoose.Schema(
// Define the schema fields
{
  institution: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  position: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Export the model
const Education = exports.Education = (0, _mongoose.model)("Education", EducationSchema);