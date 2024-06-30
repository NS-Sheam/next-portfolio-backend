"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Blog = void 0;
var _mongoose = require("mongoose");
const blogSchema = new _mongoose.Schema({
  publishDate: {
    type: Date,
    default: Date.now
  },
  author: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  image: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
const Blog = exports.Blog = (0, _mongoose.model)("Blog", blogSchema);