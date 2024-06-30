"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.sendImageToCloudinary = void 0;
var _cloudinary = require("cloudinary");
var _fs = _interopRequireDefault(require("fs"));
var _multer = _interopRequireDefault(require("multer"));
var _index = _interopRequireDefault(require("../config/index.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_cloudinary.v2.config({
  cloud_name: _index.default.cloudinary_cloud_name,
  api_key: _index.default.cloudinary_api_key,
  api_secret: _index.default.cloudinary_api_secret
});
const sendImageToCloudinary = (imageName, path) => {
  return new Promise((resolve, reject) => {
    _cloudinary.v2.uploader.upload(path, {
      public_id: imageName
    }, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
      // delete a file asynchronously
      _fs.default.unlink(path, err => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(result);
          console.log("File is deleted.");
        }
      });
    });
  });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
const storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  }
});
const upload = exports.upload = (0, _multer.default)({
  storage: storage
});