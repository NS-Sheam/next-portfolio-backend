"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _index = _interopRequireDefault(require("./app/routes/index.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//app.ts

const app = (0, _express.default)();
app.use((0, _cors.default)({
  origin: ["http://localhost:3000", "http://localhost:9000", "http://nazmus-sakib.me", "https://www.nazmus-sakib.me", "http://ns-sheam-portfolio-dashboard.netlify.app", "https://ns-sheam-portfolio-dashboard.netlify.app"],
  credentials: true
}));

// parser
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use("/api/v1", _index.default);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the API"
  });
});
var _default = exports.default = app;