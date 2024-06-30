"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;
var _index = _interopRequireDefault(require("../config/index.js"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const sendEmail = async (to, subject, html) => {
  try {
    const transporter = _nodemailer.default.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      // Use `true` for port 465, `false` for all other ports
      auth: {
        user: _index.default.email,
        pass: _index.default.app_password
      }
    });
    await transporter.sendMail({
      from: _index.default.email,
      // sender address
      to,
      // list of receivers
      subject,
      // Subject line
      html // html body
    });
  } catch (error) {
    throw new Error("Email sending failed");
  }
};
exports.sendEmail = sendEmail;