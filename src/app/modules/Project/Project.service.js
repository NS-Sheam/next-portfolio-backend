import { Project } from "./Project.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services

const createProject = async (file, payload) => {
  if (file) {
    const imageName = `${payload.name}-${Date.now()}`;
    const { secure_url } = await sendImageToCloudinary(imageName, file.path);
    payload.image = secure_url;
  }
  const result = await Project.create(payload);
  return result;
};
const getAllProject = async (query) => {
  const ProjectSearchableFields = [];
  const resultQuery = new QueryBuilder(Project.find(), query)
    .search(ProjectSearchableFields)
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
const getSingleProject = async (id) => {
  const result = await Project.findById(id);
  return result;
};
const updateProject = async (id, file, payload) => {
  if (file) {
    const imageName = `${payload.name}-${Date.now()}`;
    const { secure_url } = await sendImageToCloudinary(imageName, file.path);
    payload.image = secure_url;
  }
  const result = await Project.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  return result;
};
const deleteProject = async (id) => {
  const result = await Project.findByIdAndDelete(id);
  return result;
};

export const ProjectServices = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  deleteProject,
};
