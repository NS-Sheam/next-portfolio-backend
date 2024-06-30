"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(require("../config/index.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const globalErrorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  let errorSource = [{
    path: "",
    message
  }];
  return res.status(status).json({
    success: false,
    message,
    errorSource,
    stack: _index.default.node_env === "development" ? err.stack : undefined
  });
};
var _default = exports.default = globalErrorHandler;