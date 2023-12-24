import Joi from "joi";

export const createProductValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required().trim(),
        category_id: Joi.number().required(),
        information: Joi.string().min(10).required().trim(),
        status: Joi.boolean().required(),
        img: Joi.string().optional(),
    });

    return schema.validate(data);
};


export const updateProductValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(5),
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().min(6),
        img: Joi.string().optional(),
    });

    return schema.validate(data);
}