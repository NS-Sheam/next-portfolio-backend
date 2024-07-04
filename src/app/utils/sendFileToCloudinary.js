import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import config from "../config/index.js";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendFileToCloudinary = (fileName, path) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path, { public_id: fileName, resource_type: "auto" }, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
      // delete the file asynchronously
      fs.unlink(path, (err) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          console.log("File is deleted.");
        }
      });
    });
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]);
  },
});

export const upload = multer({ storage: storage });
