"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const notFound = (req, res, next) => {
  const success = false;
  const status = 404;
  const message = `Requested path ${req.originalUrl} Not Found`;
  res.status(status).json({
    status,
    success,
    message
  });
};
var _default = exports.default = notFound;