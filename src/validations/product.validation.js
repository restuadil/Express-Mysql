import Joi from "joi";

export const createProductValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(5).trim(),
        category_id: Joi.number().required(),
        information: Joi.string().min(10).required().trim(),
        price: Joi.number().required().min(1000),
        img: Joi.string().optional(),
        status: Joi.boolean().required(),
    });

    return schema.validate(data);
};


export const updateProductValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(5).trim(),
        category_id: Joi.number(),
        information: Joi.string().min(10).trim(),
        price: Joi.number().min(1000),
        img: Joi.string().optional(),
        status: Joi.boolean(),
    });

    return schema.validate(data);
}