"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementServices = void 0;
var _AchievementModel = require("./Achievement.model.js");
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Declare the Services 

const createAchievement = async payload => {
  const result = await _AchievementModel.Achievement.create(payload);
  return result;
};
const getAllAchievement = async query => {
  const AchievementSearchableFields = [];
  const resultQuery = new _QueryBuilder.default(_AchievementModel.Achievement.find(), query).search(AchievementSearchableFields).filter().sort().fields().paginate().limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return {
    data: result,
    meta
  };
};
const getSingleAchievement = async id => {
  const result = await _AchievementModel.Achievement.findById(id);
  return result;
};
const updateAchievement = async (id, payload) => {
  const result = await _AchievementModel.Achievement.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
  return result;
};
const deleteAchievement = async id => {
  const result = await _AchievementModel.Achievement.findByIdAndDelete(id);
  return result;
};
const AchievementServices = exports.AchievementServices = {
  createAchievement,
  getAllAchievement,
  getSingleAchievement,
  updateAchievement,
  deleteAchievement
};