import { Achievement } from "./Achievement.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary.js";

// Declare the Services

const createAchievement = async (file, payload) => {
  if (file) {
    const certificateName = `${payload.title}-${Date.now()}`;
    const { secure_url } = await sendImageToCloudinary(certificateName, file.path);
    payload.certificate = secure_url;
  }
  const totalDocuments = await Achievement.countDocuments();
  payload.position = totalDocuments + 1;
  const result = await Achievement.create(payload);
  return result;
};
const getAllAchievement = async (query) => {
  const AchievementSearchableFields = [];
  const resultQuery = new QueryBuilder(Achievement.find(), query)
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
  const result = await Achievement.findById(id);
  return result;
};
const updateAchievement = async (id, file, payload) => {
  if (file) {
    const certificateName = `${payload.title}-${Date.now()}`;
    const { secure_url } = await sendImageToCloudinary(certificateName, file.path);
    payload.certificate = secure_url;
  }
  const result = await Achievement.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  return result;
};
const updateAchievementPosition = async (id, payload) => {
  const { position: newPosition } = payload;
  const isAchievementExist = await Achievement.findById(id);
  if (!isAchievementExist) {
    throw new Error("Achievement not found");
  }

  const currentAchievementPosition = isAchievementExist.position;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const updatedAchievement = await Achievement.findByIdAndUpdate(
      id,
      { position: newPosition },
      { new: true, session }
    );

    if (!updatedAchievement) {
      throw new Error("Achievement not found");
    }

    if (currentAchievementPosition < newPosition) {
      await Achievement.updateMany(
        { _id: { $ne: id }, position: { $gt: currentAchievementPosition, $lte: newPosition } },
        { $inc: { position: -1 } },
        { session }
      );
    } else if (currentAchievementPosition > newPosition) {
      await Achievement.updateMany(
        { _id: { $ne: id }, position: { $gte: newPosition, $lt: currentAchievementPosition } },
        { $inc: { position: 1 } },
        { session }
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
  const result = await Achievement.findByIdAndDelete(id);
  return result;
};

export const AchievementServices = {
  createAchievement,
  getAllAchievement,
  getSingleAchievement,
  updateAchievement,
  updateAchievementPosition,
  deleteAchievement,
};
