import { HobbiesAndInterest } from "./HobbiesAndInterest.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services

const createHobbiesAndInterest = async (payload) => {
  const result = await HobbiesAndInterest.create(payload);
  return result;
};
const getAllHobbiesAndInterest = async (query) => {
  const HobbiesAndInterestSearchableFields = [];
  const resultQuery = new QueryBuilder(HobbiesAndInterest.find(), query)
    .search(HobbiesAndInterestSearchableFields)
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
const getSingleHobbiesAndInterest = async (id) => {
  const result = await HobbiesAndInterest.findById(id);
  return result;
};
const updateHobbiesAndInterest = async (id, payload) => {
  const result = await HobbiesAndInterest.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  return result;
};
const updateHobbiesAndInterestPosition = async (id, payload) => {
  const { position: newPosition } = payload;
  const isHobbiesAndInterestExist = await HobbiesAndInterest.findById(id);
  if (!isHobbiesAndInterestExist) {
    throw new Error("HobbiesAndInterest not found");
  }

  const currentHobbiesAndInterestPosition = isHobbiesAndInterestExist.position;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const updatedHobbiesAndInterest = await HobbiesAndInterest.findByIdAndUpdate(
      id,
      { position: newPosition },
      { new: true, session }
    );

    if (!updatedHobbiesAndInterest) {
      throw new Error("HobbiesAndInterest not found");
    }

    if (currentHobbiesAndInterestPosition < newPosition) {
      await HobbiesAndInterest.updateMany(
        { _id: { $ne: id }, position: { $gt: currentHobbiesAndInterestPosition, $lte: newPosition } },
        { $inc: { position: -1 } },
        { session }
      );
    } else {
      await HobbiesAndInterest.updateMany(
        { _id: { $ne: id }, position: { $gte: newPosition, $lt: currentHobbiesAndInterestPosition } },
        { $inc: { position: 1 } },
        { session }
      );
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
const deleteHobbiesAndInterest = async (id) => {
  const result = await HobbiesAndInterest.findByIdAndDelete(id);
  return result;
};

export const HobbiesAndInterestServices = {
  createHobbiesAndInterest,
  getAllHobbiesAndInterest,
  getSingleHobbiesAndInterest,
  updateHobbiesAndInterest,
  updateHobbiesAndInterestPosition,
  deleteHobbiesAndInterest,
};
