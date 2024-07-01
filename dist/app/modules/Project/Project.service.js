"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectServices = void 0;
var _ProjectModel = require("./Project.model.js");
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
var _sendImageToCloudinary = require("../../utils/sendImageToCloudinary.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Declare the Services

const createProject = async (file, payload) => {
  if (file) {
    const imageName = `${payload.name}-${Date.now()}`;
    const {
      secure_url
    } = await (0, _sendImageToCloudinary.sendImageToCloudinary)(imageName, file.path);
    payload.image = secure_url;
  }
  const totalDocuments = await _ProjectModel.Project.countDocuments();
  payload.position = totalDocuments + 1;
  const result = await _ProjectModel.Project.create(payload);
  return result;
};
const getAllProject = async query => {
  const ProjectSearchableFields = [];
  const resultQuery = new _QueryBuilder.default(_ProjectModel.Project.find(), query).search(ProjectSearchableFields).filter().sort().fields().paginate().limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return {
    data: result,
    meta
  };
};
const getSingleProject = async id => {
  const result = await _ProjectModel.Project.findById(id);
  return result;
};
const updateProject = async (id, file, payload) => {
  if (file) {
    const imageName = `${payload.name}-${Date.now()}`;
    const {
      secure_url
    } = await (0, _sendImageToCloudinary.sendImageToCloudinary)(imageName, file.path);
    payload.image = secure_url;
  }
  const result = await _ProjectModel.Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
  return result;
};
const updateProjectPosition = async (id, payload) => {
  const {
    position: newPosition
  } = payload;
  const isProjectExist = await _ProjectModel.Project.findById(id);
  if (!isProjectExist) {
    throw new Error("Project not found");
  }
  const currentProjectPosition = isProjectExist.position;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const updatedProject = await _ProjectModel.Project.findByIdAndUpdate(id, {
      position: newPosition
    }, {
      new: true,
      session
    });
    if (!updatedProject) {
      throw new Error("Project not found");
    }
    if (currentProjectPosition < newPosition) {
      await _ProjectModel.Project.updateMany({
        _id: {
          $ne: id
        },
        position: {
          $gt: currentProjectPosition,
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
      await _ProjectModel.Project.updateMany({
        _id: {
          $ne: id
        },
        position: {
          $gte: newPosition,
          $lt: currentProjectPosition
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
    return updatedProject;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const deleteProject = async id => {
  const result = await _ProjectModel.Project.findByIdAndDelete(id);
  return result;
};
const ProjectServices = exports.ProjectServices = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  updateProjectPosition,
  deleteProject
};