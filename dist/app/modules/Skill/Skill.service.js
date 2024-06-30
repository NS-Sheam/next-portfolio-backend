"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillServices = void 0;
var _SkillModel = require("./Skill.model.js");
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Declare the Services 

const createSkill = async payload => {
  const result = await _SkillModel.Skill.create(payload);
  return result;
};
const getAllSkill = async query => {
  const SkillSearchableFields = [];
  const resultQuery = new _QueryBuilder.default(_SkillModel.Skill.find(), query).search(SkillSearchableFields).filter().sort().fields().paginate().limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return {
    data: result,
    meta
  };
};
const getSingleSkill = async id => {
  const result = await _SkillModel.Skill.findById(id);
  return result;
};
const updateSkill = async (id, payload) => {
  const result = await _SkillModel.Skill.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
  return result;
};
const deleteSkill = async id => {
  const result = await _SkillModel.Skill.findByIdAndDelete(id);
  return result;
};
const SkillServices = exports.SkillServices = {
  createSkill,
  getAllSkill,
  getSingleSkill,
  updateSkill,
  deleteSkill
};