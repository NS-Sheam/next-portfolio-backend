"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExperienceServices = void 0;
var _ExperienceModel = require("./Experience.model.js");
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Declare the Services 

const createExperience = async payload => {
  const result = await _ExperienceModel.Experience.create(payload);
  return result;
};
const getAllExperience = async query => {
  const ExperienceSearchableFields = [];
  const resultQuery = new _QueryBuilder.default(_ExperienceModel.Experience.find(), query).search(ExperienceSearchableFields).filter().sort().fields().paginate().limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return {
    data: result,
    meta
  };
};
const getSingleExperience = async id => {
  const result = await _ExperienceModel.Experience.findById(id);
  return result;
};
const updateExperience = async (id, payload) => {
  const result = await _ExperienceModel.Experience.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
  return result;
};
const deleteExperience = async id => {
  const result = await _ExperienceModel.Experience.findByIdAndDelete(id);
  return result;
};
const ExperienceServices = exports.ExperienceServices = {
  createExperience,
  getAllExperience,
  getSingleExperience,
  updateExperience,
  deleteExperience
};