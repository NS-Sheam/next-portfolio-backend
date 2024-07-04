import { PersonalInfo } from "./PersonalInfo.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendFileToCloudinary } from "../../utils/sendFileToCloudinary.js";

// Declare the Services

const createPersonalInfo = async (file, payload) => {
  if (file) {
    const imageName = `${payload.name}-${Date.now()}`;
    const { secure_url } = await sendFileToCloudinary(imageName, file.path);
    payload.image = secure_url;
  }
  const result = await PersonalInfo.create(payload);
  return result;
};
const getAllPersonalInfo = async (query) => {
  const PersonalInfoSearchableFields = [];
  const resultQuery = new QueryBuilder(PersonalInfo.find(), query)
    .search(PersonalInfoSearchableFields)
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
const getSinglePersonalInfo = async (id) => {
  const result = await PersonalInfo.findById(id);
  return result;
};
const updatePersonalInfo = async (id, file, payload) => {
  if (file) {
    const imageName = `${payload.name}-${Date.now()}`;
    const { secure_url } = await sendFileToCloudinary(imageName, file.path);
    payload.image = secure_url;
  }
  const result = await PersonalInfo.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  return result;
};
const deletePersonalInfo = async (id) => {
  const result = await PersonalInfo.findByIdAndDelete(id);
  return result;
};

export const PersonalInfoServices = {
  createPersonalInfo,
  getAllPersonalInfo,
  getSinglePersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
};
