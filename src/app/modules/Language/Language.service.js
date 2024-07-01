import { Language } from "./Language.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services

const createLanguage = async (payload) => {
  const totalDocuments = await Language.countDocuments();
  payload.position = totalDocuments + 1;
  const result = await Language.create(payload);
  return result;
};
const getAllLanguage = async (query) => {
  const LanguageSearchableFields = [];
  const resultQuery = new QueryBuilder(Language.find(), query)
    .search(LanguageSearchableFields)
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
const getSingleLanguage = async (id) => {
  const result = await Language.findById(id);
  return result;
};
const updateLanguage = async (id, payload) => {
  const result = await Language.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  return result;
};
const updateLanguagePosition = async (id, payload) => {
  const { position: newPosition } = payload;
  const isLanguageExist = await Language.findById(id);
  if (!isLanguageExist) {
    throw new Error("Language not found");
  }

  const currentLanguagePosition = isLanguageExist.position;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const updatedLanguage = await Language.findByIdAndUpdate(id, { position: newPosition }, { new: true, session });

    if (!updatedLanguage) {
      throw new Error("Language not found");
    }

    if (currentLanguagePosition < newPosition) {
      await Language.updateMany(
        { _id: { $ne: id }, position: { $gt: currentLanguagePosition, $lte: newPosition } },
        { $inc: { position: -1 } },
        { session }
      );
    } else {
      await Language.updateMany(
        { _id: { $ne: id }, position: { $gte: newPosition, $lt: currentLanguagePosition } },
        { $inc: { position: 1 } },
        { session }
      );
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
const deleteLanguage = async (id) => {
  const result = await Language.findByIdAndDelete(id);
  return result;
};

export const LanguageServices = {
  createLanguage,
  getAllLanguage,
  getSingleLanguage,
  updateLanguage,
  updateLanguagePosition,
  deleteLanguage,
};
