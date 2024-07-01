"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Language = void 0;
var _mongoose = require("mongoose");
// Declare the Schema of the Mongo model
const LanguageSchema = new _mongoose.Schema({
  // Define the schema fields
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Export the model
const Language = exports.Language = (0, _mongoose.model)("Language", LanguageSchema);