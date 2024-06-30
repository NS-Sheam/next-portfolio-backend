"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HobbyServices = void 0;
var _HobbyModel = require("./Hobby.model.js");
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Declare the Services 

const createHobby = async payload => {
  const result = await _HobbyModel.Hobby.create(payload);
  return result;
};
const getAllHobby = async query => {
  const HobbySearchableFields = [];
  const resultQuery = new _QueryBuilder.default(_HobbyModel.Hobby.find(), query).search(HobbySearchableFields).filter().sort().fields().paginate().limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return {
    data: result,
    meta
  };
};
const getSingleHobby = async id => {
  const result = await _HobbyModel.Hobby.findById(id);
  return result;
};
const updateHobby = async (id, payload) => {
  const result = await _HobbyModel.Hobby.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
  return result;
};
const deleteHobby = async id => {
  const result = await _HobbyModel.Hobby.findByIdAndDelete(id);
  return result;
};
const HobbyServices = exports.HobbyServices = {
  createHobby,
  getAllHobby,
  getSingleHobby,
  updateHobby,
  deleteHobby
};