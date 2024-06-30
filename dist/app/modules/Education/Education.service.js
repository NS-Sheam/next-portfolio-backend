"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EducationServices = void 0;
var _EducationModel = require("./Education.model.js");
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Declare the Services 

const createEducation = async payload => {
  const result = await _EducationModel.Education.create(payload);
  return result;
};
const getAllEducation = async query => {
  const EducationSearchableFields = [];
  const resultQuery = new _QueryBuilder.default(_EducationModel.Education.find(), query).search(EducationSearchableFields).filter().sort().fields().paginate().limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return {
    data: result,
    meta
  };
};
const getSingleEducation = async id => {
  const result = await _EducationModel.Education.findById(id);
  return result;
};
const updateEducation = async (id, payload) => {
  const result = await _EducationModel.Education.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
  return result;
};
const deleteEducation = async id => {
  const result = await _EducationModel.Education.findByIdAndDelete(id);
  return result;
};
const EducationServices = exports.EducationServices = {
  createEducation,
  getAllEducation,
  getSingleEducation,
  updateEducation,
  deleteEducation
};