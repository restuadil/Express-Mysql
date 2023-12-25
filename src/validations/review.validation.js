import Joi from "joi";

export const createReviewValidation = (data) => {
    const schema = Joi.object({
        product_id: Joi.number().required(),
        user_id: Joi.number().required(),
        review: Joi.string().min(10).required().trim(),
    });

    return schema.validate(data);
};


export const updateReviewValidation = (data) => {
    const schema = Joi.object({
        product_id: Joi.number(),
        user_id: Joi.number(),
        review: Joi.string().min(10).trim(),
    });

    return schema.validate(data);
}