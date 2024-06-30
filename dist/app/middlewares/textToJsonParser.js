"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const textToJsonPerser = (req, res, next) => {
  if (req?.body?.data) {
    req.body = JSON.parse(req.body.data);
  }
  next();
};
var _default = exports.default = textToJsonPerser;