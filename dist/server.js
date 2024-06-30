"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _app = _interopRequireDefault(require("./app.js"));
var _index = _interopRequireDefault(require("./app/config/index.js"));
var _globalErrorHandler = _interopRequireDefault(require("./app/middlewares/globalErrorHandler.js"));
var _notFoundRoutes = _interopRequireDefault(require("./app/middlewares/notFoundRoutes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let server;
async function main() {
  try {
    await _mongoose.default.connect(_index.default.database_url);
    server = _app.default.listen(_index.default.port, () => {
      console.log(`Server running at port ${_index.default.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
main();
_app.default.use(_globalErrorHandler.default);
_app.default.use(_notFoundRoutes.default);
process.on("unhandledRejection", (error, promise) => {
  console.log("❌ Shutting down the server due to unhandled rejection at:", promise, "with reason:", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
process.on("uncaughtException", error => {
  console.log("❌ Shutting down the server due to uncaught exception with reason:", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});