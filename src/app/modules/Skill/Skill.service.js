import { Skill } from "./Skill.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services

const createSkill = async (file, payload) => {
  if (file) {
    const imageName = `${payload.title}-${Date.now()}`;
    const { secure_url } = await sendImageToCloudinary(imageName, file.path);
    payload.image = secure_url;
  }
  const totalDocuments = await Skill.countDocuments();
  payload.position = totalDocuments + 1;
  const result = await Skill.create(payload);
  return result;
};
const getAllSkill = async (query) => {
  const SkillSearchableFields = [];
  const resultQuery = new QueryBuilder(Skill.find(), query)
    .search(SkillSearchableFields)
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
const getSingleSkill = async (id) => {
  const result = await Skill.findById(id);
  return result;
};
const updateSkill = async (id, file, payload) => {
  if (file) {
    const imageName = `${payload.title}-${Date.now()}`;
    const { secure_url } = await sendImageToCloudinary(imageName, file.path);
    payload.image = secure_url;
  }
  const result = await Skill.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  return result;
};
const updateSkillPosition = async (id, payload) => {
  const { position: newPosition } = payload;
  const isSkillExist = await Skill.findById(id);
  if (!isSkillExist) {
    throw new Error("Skill not found");
  }

  const currentSkillPosition = isSkillExist.position;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const updatedSkill = await Skill.findByIdAndUpdate(id, { position: newPosition }, { new: true, session });

    if (!updatedSkill) {
      throw new Error("Skill not found");
    }

    if (currentSkillPosition < newPosition) {
      await Skill.updateMany(
        { _id: { $ne: id }, position: { $gt: currentSkillPosition, $lte: newPosition } },
        { $inc: { position: -1 } },
        { session }
      );
    } else if (currentSkillPosition > newPosition) {
      await Skill.updateMany(
        { _id: { $ne: id }, position: { $gte: newPosition, $lt: currentSkillPosition } },
        { $inc: { position: 1 } },
        { session }
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return updatedSkill;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
const deleteSkill = async (id) => {
  const result = await Skill.findByIdAndDelete(id);
  return result;
};

export const SkillServices = {
  createSkill,
  getAllSkill,
  getSingleSkill,
  updateSkill,
  updateSkillPosition,
  deleteSkill,
};
