const Joi = require('joi'); 
const loginSchemas = {
    registerForm: Joi.object().keys({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().pattern(/^[0-9]+$/),
        password: Joi.string().min(6).required(),
        conPassword: Joi.string().valid(Joi.ref('password')).required()
    }),
    loginForm: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        remember: Joi.boolean().required(),
    })
};

module.exports = loginSchemas;