"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hobby = void 0;
var _mongoose = require("mongoose");
// Declare the Schema of the Mongo model
const HobbySchema = new _mongoose.Schema({
  // Define the schema fields
  name: {
    type: String,
    required: true
  },
  passionLevel: {
    type: String
  }
}, {
  timestamps: true
});

// Export the model
const Hobby = exports.Hobby = (0, _mongoose.model)("Hobby", HobbySchema);