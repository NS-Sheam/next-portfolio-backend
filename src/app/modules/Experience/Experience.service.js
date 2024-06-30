
import { Experience } from "./Experience.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services 

const createExperience = async (payload) => {
    const result = await Experience.create(payload);
    return result;
}
const getAllExperience = async (query) => {
    const ExperienceSearchableFields = [];
    const resultQuery = new QueryBuilder(Experience.find(), query).search(ExperienceSearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
const getSingleExperience = async (id) => {
    const result = await Experience.findById(id);
    return result;
}
const updateExperience = async (id, payload) => {
    const result = await Experience.findByIdAndUpdate(id, payload, { new: true, runValidators: true});
    return result;
}
const deleteExperience = async (id) => {
    const result = await Experience.findByIdAndDelete(id);
    return result;
}

export const ExperienceServices = {
    createExperience,
    getAllExperience,
    getSingleExperience,
    updateExperience,
    deleteExperience
}
