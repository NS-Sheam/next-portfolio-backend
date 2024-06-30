
import { Skill } from "./Skill.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services 

const createSkill = async (payload) => {
    const result = await Skill.create(payload);
    return result;
}
const getAllSkill = async (query) => {
    const SkillSearchableFields = [];
    const resultQuery = new QueryBuilder(Skill.find(), query).search(SkillSearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
const getSingleSkill = async (id) => {
    const result = await Skill.findById(id);
    return result;
}
const updateSkill = async (id, payload) => {
    const result = await Skill.findByIdAndUpdate(id, payload, { new: true, runValidators: true});
    return result;
}
const deleteSkill = async (id) => {
    const result = await Skill.findByIdAndDelete(id);
    return result;
}

export const SkillServices = {
    createSkill,
    getAllSkill,
    getSingleSkill,
    updateSkill,
    deleteSkill
}
