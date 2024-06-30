"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Achievement = void 0;
var _mongoose = require("mongoose");
// Declare the Schema of the Mongo model
const AchievementSchema = new _mongoose.Schema({
  // Define the schema fields
  title: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Export the model
const Achievement = exports.Achievement = (0, _mongoose.model)("Achievement", AchievementSchema);