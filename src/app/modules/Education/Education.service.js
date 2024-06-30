
import { Education } from "./Education.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services 

const createEducation = async (payload) => {
    const result = await Education.create(payload);
    return result;
}
const getAllEducation = async (query) => {
    const EducationSearchableFields = [];
    const resultQuery = new QueryBuilder(Education.find(), query).search(EducationSearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
const getSingleEducation = async (id) => {
    const result = await Education.findById(id);
    return result;
}
const updateEducation = async (id, payload) => {
    const result = await Education.findByIdAndUpdate(id, payload, { new: true, runValidators: true});
    return result;
}
const deleteEducation = async (id) => {
    const result = await Education.findByIdAndDelete(id);
    return result;
}

export const EducationServices = {
    createEducation,
    getAllEducation,
    getSingleEducation,
    updateEducation,
    deleteEducation
}
