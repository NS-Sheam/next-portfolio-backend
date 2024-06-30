
import { HobbiesAndInterest } from "./HobbiesAndInterest.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services 

const createHobbiesAndInterest = async (payload) => {
    const result = await HobbiesAndInterest.create(payload);
    return result;
}
const getAllHobbiesAndInterest = async (query) => {
    const HobbiesAndInterestSearchableFields = [];
    const resultQuery = new QueryBuilder(HobbiesAndInterest.find(), query).search(HobbiesAndInterestSearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
const getSingleHobbiesAndInterest = async (id) => {
    const result = await HobbiesAndInterest.findById(id);
    return result;
}
const updateHobbiesAndInterest = async (id, payload) => {
    const result = await HobbiesAndInterest.findByIdAndUpdate(id, payload, { new: true, runValidators: true});
    return result;
}
const deleteHobbiesAndInterest = async (id) => {
    const result = await HobbiesAndInterest.findByIdAndDelete(id);
    return result;
}

export const HobbiesAndInterestServices = {
    createHobbiesAndInterest,
    getAllHobbiesAndInterest,
    getSingleHobbiesAndInterest,
    updateHobbiesAndInterest,
    deleteHobbiesAndInterest
}
