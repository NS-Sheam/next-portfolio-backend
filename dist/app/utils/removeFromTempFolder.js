"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const removeFromTempFolder = fileName => {
  const filePath = _path.default.join(process.cwd(), "uploads", fileName);
  _fs.default.unlink(filePath, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("File is deleted.");
    }
  });
};
var _default = exports.default = removeFromTempFolder;