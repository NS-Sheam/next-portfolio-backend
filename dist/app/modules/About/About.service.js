"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AboutServices = void 0;
var _AboutModel = require("./About.model.js");
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createAbout = async payload => {
  const result = await _AboutModel.About.create(payload);
  return result;
};
const getAllAbout = async query => {
  const AboutSearchableFields = [];
  const resultQuery = new _QueryBuilder.default(_AboutModel.About.find(), query).search(AboutSearchableFields).filter().sort().fields().paginate().limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return {
    data: result,
    meta
  };
};
const getSingleAbout = async id => {
  const result = await _AboutModel.About.findById(id);
  return result;
};
const updateAbout = async (id, payload) => {
  const {
    skills,
    experience,
    education,
    achievements,
    hobbiesAndInterests,
    ...remaining
  } = payload;
  const about = await _AboutModel.About.findById(id);
  if (!about) {
    throw new Error("About not found");
  }

  // Update skills array
  if (skills && skills.length > 0) {
    const existingSkills = about.skills.map(skill => ({
      name: skill,
      isDeleted: false
    }));
    skills.forEach(skill => {
      const index = existingSkills.findIndex(sk => sk.name === skill.name);
      if (index !== -1) {
        existingSkills[index].isDeleted = skill.isDeleted;
      } else {
        existingSkills.push(skill);
      }
    });
    remaining.skills = existingSkills.filter(sk => !sk.isDeleted).map(sk => sk.name);
  }

  // Update experience array
  if (experience && experience.length > 0) {
    const existingExperience = about.experience.map(exp => ({
      ...exp.toObject(),
      isDeleted: false
    }));
    experience.forEach(exp => {
      const index = existingExperience.findIndex(e => e._id.toString() === exp._id);
      if (index !== -1) {
        existingExperience[index].isDeleted = exp.isDeleted;
      } else {
        existingExperience.push(exp);
      }
    });
    remaining.experience = existingExperience.filter(exp => !exp.isDeleted);
  }

  // Update education array
  if (education && education.length > 0) {
    const existingEducation = about.education.map(edu => ({
      ...edu.toObject(),
      isDeleted: false
    }));
    education.forEach(edu => {
      const index = existingEducation.findIndex(e => e._id.toString() === edu._id);
      if (index !== -1) {
        existingEducation[index].isDeleted = edu.isDeleted;
      } else {
        existingEducation.push(edu);
      }
    });
    remaining.education = existingEducation.filter(edu => !edu.isDeleted);
  }

  // Update achievements array
  if (achievements && achievements.length > 0) {
    const existingAchievements = about.achievements.map(ach => ({
      ...ach.toObject(),
      isDeleted: false
    }));
    achievements.forEach(ach => {
      const index = existingAchievements.findIndex(a => a._id.toString() === ach._id);
      if (index !== -1) {
        existingAchievements[index].isDeleted = ach.isDeleted;
      } else {
        existingAchievements.push(ach);
      }
    });
    remaining.achievements = existingAchievements.filter(ach => !ach.isDeleted);
  }

  // Update hobbiesAndInterests array
  if (hobbiesAndInterests && hobbiesAndInterests.length > 0) {
    const existingHobbies = about.hobbiesAndInterests.map(hobby => ({
      name: hobby,
      isDeleted: false
    }));
    hobbiesAndInterests.forEach(hobby => {
      const index = existingHobbies.findIndex(h => h.name === hobby.name);
      if (index !== -1) {
        existingHobbies[index].isDeleted = hobby.isDeleted;
      } else {
        existingHobbies.push(hobby);
      }
    });
    remaining.hobbiesAndInterests = existingHobbies.filter(h => !h.isDeleted).map(h => h.name);
  }

  // Update any other fields in 'remaining'

  const result = await _AboutModel.About.findByIdAndUpdate(id, remaining, {
    new: true,
    runValidators: true
  });
  return result;
};
const deleteAbout = async id => {
  const result = await _AboutModel.About.findByIdAndDelete(id);
  return result;
};
const AboutServices = exports.AboutServices = {
  createAbout,
  getAllAbout,
  getSingleAbout,
  updateAbout,
  deleteAbout
};