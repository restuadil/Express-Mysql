import Joi from "joi";

export const createUserValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(6).required(),
        img: Joi.string().optional(),
    });

    return schema.validate(data);
};


export const updateUserValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(5),
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().min(6),
        img: Joi.string().optional(),
    });

    return schema.validate(data);
}