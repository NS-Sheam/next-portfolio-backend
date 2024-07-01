import { Education } from "./Education.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services

const createEducation = async (payload) => {
  const totalDocuments = await Education.countDocuments();
  payload.position = totalDocuments + 1;
  const result = await Education.create(payload);
  return result;
};
const getAllEducation = async (query) => {
  const EducationSearchableFields = [];
  const resultQuery = new QueryBuilder(Education.find(), query)
    .search(EducationSearchableFields)
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
const getSingleEducation = async (id) => {
  const result = await Education.findById(id);
  return result;
};
const updateEducation = async (id, payload) => {
  const result = await Education.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  return result;
};
const updateEducationPosition = async (id, payload) => {
  const { position: newPosition } = payload;
  const isEducationExist = await Education.findById(id);
  if (!isEducationExist) {
    throw new Error("Education not found");
  }

  const currentEducationPosition = isEducationExist.position;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const updatedEducation = await Education.findByIdAndUpdate(id, { position: newPosition }, { new: true, session });

    if (!updatedEducation) {
      throw new Error("Education not found");
    }

    if (currentEducationPosition < newPosition) {
      await Education.updateMany(
        { _id: { $ne: id }, position: { $gt: currentEducationPosition, $lte: newPosition } },
        { $inc: { position: -1 } },
        { session }
      );
    } else if (currentEducationPosition > newPosition) {
      await Education.updateMany(
        { _id: { $ne: id }, position: { $gte: newPosition, $lt: currentEducationPosition } },
        { $inc: { position: 1 } },
        { session }
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return updatedEducation;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
const deleteEducation = async (id) => {
  const result = await Education.findByIdAndDelete(id);
  return result;
};

export const EducationServices = {
  createEducation,
  getAllEducation,
  getSingleEducation,
  updateEducation,
  updateEducationPosition,
  deleteEducation,
};
