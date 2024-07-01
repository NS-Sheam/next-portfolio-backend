"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalInfoServices = void 0;
var _PersonalInfoModel = require("./PersonalInfo.model.js");
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
var _sendImageToCloudinary = require("../../utils/sendImageToCloudinary.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Declare the Services

const createPersonalInfo = async (file, payload) => {
  if (file) {
    const imageName = `${payload.name}-${Date.now()}`;
    const {
      secure_url
    } = await (0, _sendImageToCloudinary.sendImageToCloudinary)(imageName, file.path);
    payload.image = secure_url;
  }
  const result = await _PersonalInfoModel.PersonalInfo.create(payload);
  return result;
};
const getAllPersonalInfo = async query => {
  const PersonalInfoSearchableFields = [];
  const resultQuery = new _QueryBuilder.default(_PersonalInfoModel.PersonalInfo.find(), query).search(PersonalInfoSearchableFields).filter().sort().fields().paginate().limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return {
    data: result,
    meta
  };
};
const getSinglePersonalInfo = async id => {
  const result = await _PersonalInfoModel.PersonalInfo.findById(id);
  return result;
};
const updatePersonalInfo = async (id, file, payload) => {
  if (file) {
    const imageName = `${payload.name}-${Date.now()}`;
    const {
      secure_url
    } = await (0, _sendImageToCloudinary.sendImageToCloudinary)(imageName, file.path);
    payload.image = secure_url;
  }
  const result = await _PersonalInfoModel.PersonalInfo.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
  return result;
};
const deletePersonalInfo = async id => {
  const result = await _PersonalInfoModel.PersonalInfo.findByIdAndDelete(id);
  return result;
};
const PersonalInfoServices = exports.PersonalInfoServices = {
  createPersonalInfo,
  getAllPersonalInfo,
  getSinglePersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo
};