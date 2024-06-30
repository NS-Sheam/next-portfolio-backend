
import { Hobby } from "./Hobby.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services 

const createHobby = async (payload) => {
    const result = await Hobby.create(payload);
    return result;
}
const getAllHobby = async (query) => {
    const HobbySearchableFields = [];
    const resultQuery = new QueryBuilder(Hobby.find(), query).search(HobbySearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
const getSingleHobby = async (id) => {
    const result = await Hobby.findById(id);
    return result;
}
const updateHobby = async (id, payload) => {
    const result = await Hobby.findByIdAndUpdate(id, payload, { new: true, runValidators: true});
    return result;
}
const deleteHobby = async (id) => {
    const result = await Hobby.findByIdAndDelete(id);
    return result;
}

export const HobbyServices = {
    createHobby,
    getAllHobby,
    getSingleHobby,
    updateHobby,
    deleteHobby
}
