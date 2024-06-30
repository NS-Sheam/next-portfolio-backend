"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const sendResponse = (res, data) => {
  return res.status(data.status).json({
    success: data.success,
    message: data.message,
    meta: data?.meta,
    data: data?.data
  });
};
var _default = exports.default = sendResponse;