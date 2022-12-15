import Joi from "joi";

const loginSchemas = {
    registerForm: Joi.object().keys({
        name: Joi.string().trim().min(3).max(100).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        phoneNumber: Joi.string().trim().min(10).max(20).pattern(/^[0-9]+$/).message('The phone number must be a number'),
        password: Joi.string().min(6).required(),
        conPassword: Joi.valid(Joi.ref('password')).required()
    }),
    loginForm: Joi.object().keys({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).required(),
        remember: Joi.boolean().required()
    })
};

export default loginSchemas;