"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HobbiesAndInterestServices = void 0;
var _HobbiesAndInterestModel = require("./HobbiesAndInterest.model.js");
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Declare the Services

const createHobbiesAndInterest = async payload => {
  const result = await _HobbiesAndInterestModel.HobbiesAndInterest.create(payload);
  return result;
};
const getAllHobbiesAndInterest = async query => {
  const HobbiesAndInterestSearchableFields = [];
  const resultQuery = new _QueryBuilder.default(_HobbiesAndInterestModel.HobbiesAndInterest.find(), query).search(HobbiesAndInterestSearchableFields).filter().sort().fields().paginate().limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return {
    data: result,
    meta
  };
};
const getSingleHobbiesAndInterest = async id => {
  const result = await _HobbiesAndInterestModel.HobbiesAndInterest.findById(id);
  return result;
};
const updateHobbiesAndInterest = async (id, payload) => {
  const result = await _HobbiesAndInterestModel.HobbiesAndInterest.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
  return result;
};
const updateHobbiesAndInterestPosition = async (id, payload) => {
  const {
    position: newPosition
  } = payload;
  const isHobbiesAndInterestExist = await _HobbiesAndInterestModel.HobbiesAndInterest.findById(id);
  if (!isHobbiesAndInterestExist) {
    throw new Error("HobbiesAndInterest not found");
  }
  const currentHobbiesAndInterestPosition = isHobbiesAndInterestExist.position;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const updatedHobbiesAndInterest = await _HobbiesAndInterestModel.HobbiesAndInterest.findByIdAndUpdate(id, {
      position: newPosition
    }, {
      new: true,
      session
    });
    if (!updatedHobbiesAndInterest) {
      throw new Error("HobbiesAndInterest not found");
    }
    if (currentHobbiesAndInterestPosition < newPosition) {
      await _HobbiesAndInterestModel.HobbiesAndInterest.updateMany({
        _id: {
          $ne: id
        },
        position: {
          $gt: currentHobbiesAndInterestPosition,
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
      await _HobbiesAndInterestModel.HobbiesAndInterest.updateMany({
        _id: {
          $ne: id
        },
        position: {
          $gte: newPosition,
          $lt: currentHobbiesAndInterestPosition
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
    return updatedHobbiesAndInterest;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const deleteHobbiesAndInterest = async id => {
  const result = await _HobbiesAndInterestModel.HobbiesAndInterest.findByIdAndDelete(id);
  return result;
};
const HobbiesAndInterestServices = exports.HobbiesAndInterestServices = {
  createHobbiesAndInterest,
  getAllHobbiesAndInterest,
  getSingleHobbiesAndInterest,
  updateHobbiesAndInterest,
  updateHobbiesAndInterestPosition,
  deleteHobbiesAndInterest
};