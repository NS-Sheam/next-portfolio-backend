"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skill = void 0;
var _mongoose = require("mongoose");
// Declare the Schema of the Mongo model
const SkillSchema = new _mongoose.Schema({
  // Define the schema fields
  name: {
    type: String,
    required: true
  },
  proficiency: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Export the model
const Skill = exports.Skill = (0, _mongoose.model)("Skill", SkillSchema);