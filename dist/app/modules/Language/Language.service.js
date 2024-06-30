"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageServices = void 0;
var _LanguageModel = require("./Language.model.js");
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Declare the Services 

const createLanguage = async payload => {
  const result = await _LanguageModel.Language.create(payload);
  return result;
};
const getAllLanguage = async query => {
  const LanguageSearchableFields = [];
  const resultQuery = new _QueryBuilder.default(_LanguageModel.Language.find(), query).search(LanguageSearchableFields).filter().sort().fields().paginate().limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return {
    data: result,
    meta
  };
};
const getSingleLanguage = async id => {
  const result = await _LanguageModel.Language.findById(id);
  return result;
};
const updateLanguage = async (id, payload) => {
  const result = await _LanguageModel.Language.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
  return result;
};
const deleteLanguage = async id => {
  const result = await _LanguageModel.Language.findByIdAndDelete(id);
  return result;
};
const LanguageServices = exports.LanguageServices = {
  createLanguage,
  getAllLanguage,
  getSingleLanguage,
  updateLanguage,
  deleteLanguage
};