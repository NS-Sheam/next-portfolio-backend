"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.AchievementServices = void 0;
var _AchievementModel = require("./Achievement.model.js");
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
var _sendFileToCloudinary = require("../../utils/sendFileToCloudinary.js");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
// Declare the Services

const createAchievement = async (file, payload) => {
  if (file) {
    const certificateName = `${payload.title}-${Date.now()}`;
    const { secure_url } = await (0, _sendFileToCloudinary.sendFileToCloudinary)(certificateName, file.path);
    payload.certificate = secure_url;
  }
  const totalDocuments = await _AchievementModel.Achievement.countDocuments();
  payload.position = totalDocuments + 1;
  const result = await _AchievementModel.Achievement.create(payload);
  return result;
};
const getAllAchievement = async (query) => {
  const AchievementSearchableFields = [];
  const resultQuery = new _QueryBuilder.default(_AchievementModel.Achievement.find(), query)
    .search(AchievementSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return {
    data: result,
    meta,
  };
};
const getSingleAchievement = async (id) => {
  const result = await _AchievementModel.Achievement.findById(id);
  return result;
};
const updateAchievement = async (id, file, payload) => {
  if (file) {
    const certificateName = `${payload.title}-${Date.now()}`;
    const { secure_url } = await (0, _sendFileToCloudinary.sendFileToCloudinary)(certificateName, file.path);
    payload.certificate = secure_url;
  }
  const result = await _AchievementModel.Achievement.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const updateAchievementPosition = async (id, payload) => {
  const { position: newPosition } = payload;
  const isAchievementExist = await _AchievementModel.Achievement.findById(id);
  if (!isAchievementExist) {
    throw new Error("Achievement not found");
  }
  const currentAchievementPosition = isAchievementExist.position;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const updatedAchievement = await _AchievementModel.Achievement.findByIdAndUpdate(
      id,
      {
        position: newPosition,
      },
      {
        new: true,
        session,
      }
    );
    if (!updatedAchievement) {
      throw new Error("Achievement not found");
    }
    if (currentAchievementPosition < newPosition) {
      await _AchievementModel.Achievement.updateMany(
        {
          _id: {
            $ne: id,
          },
          position: {
            $gt: currentAchievementPosition,
            $lte: newPosition,
          },
        },
        {
          $inc: {
            position: -1,
          },
        },
        {
          session,
        }
      );
    } else if (currentAchievementPosition > newPosition) {
      await _AchievementModel.Achievement.updateMany(
        {
          _id: {
            $ne: id,
          },
          position: {
            $gte: newPosition,
            $lt: currentAchievementPosition,
          },
        },
        {
          $inc: {
            position: 1,
          },
        },
        {
          session,
        }
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return updatedAchievement;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
const deleteAchievement = async (id) => {
  const result = await _AchievementModel.Achievement.findByIdAndDelete(id);
  return result;
};
const AchievementServices = (exports.AchievementServices = {
  createAchievement,
  getAllAchievement,
  getSingleAchievement,
  updateAchievement,
  updateAchievementPosition,
  deleteAchievement,
});
