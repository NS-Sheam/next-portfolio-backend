"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JwtHelpers = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createToken = (payload, secret, expiresIn) => {
  return _jsonwebtoken.default.sign(payload, secret, {
    expiresIn
  });
};
const verifyToken = (token, secret) => {
  return _jsonwebtoken.default.verify(token, secret);
};
const JwtHelpers = exports.JwtHelpers = {
  createToken,
  verifyToken
};