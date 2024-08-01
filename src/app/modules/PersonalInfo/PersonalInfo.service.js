
import { PersonalInfo } from "./personalInfo.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services 

const createPersonalInfo = async (payload) => {
    const result = await PersonalInfo.create(payload);
    return result;
}
const getAllPersonalInfo = async (query) => {
    const personalInfoSearchableFields = [];
    const resultQuery = new QueryBuilder(PersonalInfo.find(), query).search(personalInfoSearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
const getSinglePersonalInfo = async (id) => {
    const result = await PersonalInfo.findById(id);
    return result;
}
const updatePersonalInfo = async (id, payload) => {
    const result = await PersonalInfo.findByIdAndUpdate(id, payload, { new: true, runValidators: true});
    return result;
}
const deletePersonalInfo = async (id) => {
    const result = await PersonalInfo.findByIdAndDelete(id);
    return result;
}

export const PersonalInfoServices = {
    createPersonalInfo,
    getAllPersonalInfo,
    getSinglePersonalInfo,
    updatePersonalInfo,
    deletePersonalInfo
}
