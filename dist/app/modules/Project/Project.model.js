"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Project = void 0;
var _mongoose = require("mongoose");
// Declare the Schema of the Mongo model
const ProjectSchema = new _mongoose.Schema({
  // Define the schema fields
  name: {
    type: String,
    required: true
  },
  technology: {
    type: [String],
    required: true
  },
  features: {
    type: [String],
    required: true
  },
  clientSite: {
    type: String
  },
  serverSite: {
    type: String
  },
  liveSite: {
    type: String
  },
  image: {
    type: String // URL of the image
  },
  basedOn: {
    type: [String]
  },
  position: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Export the model
const Project = exports.Project = (0, _mongoose.model)("Project", ProjectSchema);