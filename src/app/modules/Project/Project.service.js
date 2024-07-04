import { Project } from "./Project.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendFileToCloudinary } from "../../utils/sendFileToCloudinary.js";

// Declare the Services

const createProject = async (file, payload) => {
  if (file) {
    const imageName = `${payload.name}-${Date.now()}`;
    const { secure_url } = await sendFileToCloudinary(imageName, file.path);
    payload.image = secure_url;
  }
  const totalDocuments = await Project.countDocuments();
  payload.position = totalDocuments + 1;
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
    const { secure_url } = await sendFileToCloudinary(imageName, file.path);
    payload.image = secure_url;
  }
  const result = await Project.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  return result;
};
const updateProjectPosition = async (id, payload) => {
  const { position: newPosition } = payload;
  const isProjectExist = await Project.findById(id);
  if (!isProjectExist) {
    throw new Error("Project not found");
  }

  const currentProjectPosition = isProjectExist.position;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const updatedProject = await Project.findByIdAndUpdate(id, { position: newPosition }, { new: true, session });

    if (!updatedProject) {
      throw new Error("Project not found");
    }

    if (currentProjectPosition < newPosition) {
      await Project.updateMany(
        { _id: { $ne: id }, position: { $gt: currentProjectPosition, $lte: newPosition } },
        { $inc: { position: -1 } },
        { session }
      );
    } else {
      await Project.updateMany(
        { _id: { $ne: id }, position: { $gte: newPosition, $lt: currentProjectPosition } },
        { $inc: { position: 1 } },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    return updatedProject;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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
  updateProjectPosition,
  deleteProject,
};
