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
  const totalDocuments = await _LanguageModel.Language.countDocuments();
  payload.position = totalDocuments + 1;
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
const updateLanguagePosition = async (id, payload) => {
  const {
    position: newPosition
  } = payload;
  const isLanguageExist = await _LanguageModel.Language.findById(id);
  if (!isLanguageExist) {
    throw new Error("Language not found");
  }
  const currentLanguagePosition = isLanguageExist.position;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const updatedLanguage = await _LanguageModel.Language.findByIdAndUpdate(id, {
      position: newPosition
    }, {
      new: true,
      session
    });
    if (!updatedLanguage) {
      throw new Error("Language not found");
    }
    if (currentLanguagePosition < newPosition) {
      await _LanguageModel.Language.updateMany({
        _id: {
          $ne: id
        },
        position: {
          $gt: currentLanguagePosition,
          $lte: newPosition
        }
      }, {
        $inc: {
          position: -1
        }
      }, {
        session
      });
    } else {
      await _LanguageModel.Language.updateMany({
        _id: {
          $ne: id
        },
        position: {
          $gte: newPosition,
          $lt: currentLanguagePosition
        }
      }, {
        $inc: {
          position: 1
        }
      }, {
        session
      });
    }
    await session.commitTransaction();
    session.endSession();
    return updatedLanguage;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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
  updateLanguagePosition,
  deleteLanguage
};