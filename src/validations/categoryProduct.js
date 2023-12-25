import Joi from "joi";

export const createCategoryProductValidation = (data) => {
    const schema = Joi.object({ category: Joi.string().required().trim(), });
    return schema.validate(data);
};


export const updateCategoryProductValidation = (data) => {
    const schema = Joi.object({ category: Joi.string().trim(), });
    return schema.validate(data);
}