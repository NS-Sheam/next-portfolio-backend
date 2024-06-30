
import { Achievement } from "./Achievement.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services 

const createAchievement = async (payload) => {
    const result = await Achievement.create(payload);
    return result;
}
const getAllAchievement = async (query) => {
    const AchievementSearchableFields = [];
    const resultQuery = new QueryBuilder(Achievement.find(), query).search(AchievementSearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
const getSingleAchievement = async (id) => {
    const result = await Achievement.findById(id);
    return result;
}
const updateAchievement = async (id, payload) => {
    const result = await Achievement.findByIdAndUpdate(id, payload, { new: true, runValidators: true});
    return result;
}
const deleteAchievement = async (id) => {
    const result = await Achievement.findByIdAndDelete(id);
    return result;
}

export const AchievementServices = {
    createAchievement,
    getAllAchievement,
    getSingleAchievement,
    updateAchievement,
    deleteAchievement
}
