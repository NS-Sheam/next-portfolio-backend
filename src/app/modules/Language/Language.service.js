
import { Language } from "./Language.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services 

const createLanguage = async (payload) => {
    const result = await Language.create(payload);
    return result;
}
const getAllLanguage = async (query) => {
    const LanguageSearchableFields = [];
    const resultQuery = new QueryBuilder(Language.find(), query).search(LanguageSearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
const getSingleLanguage = async (id) => {
    const result = await Language.findById(id);
    return result;
}
const updateLanguage = async (id, payload) => {
    const result = await Language.findByIdAndUpdate(id, payload, { new: true, runValidators: true});
    return result;
}
const deleteLanguage = async (id) => {
    const result = await Language.findByIdAndDelete(id);
    return result;
}

export const LanguageServices = {
    createLanguage,
    getAllLanguage,
    getSingleLanguage,
    updateLanguage,
    deleteLanguage
}
