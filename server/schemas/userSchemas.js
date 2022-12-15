const Joi = require('joi');

const userSchemas = {
    profileForm: Joi.object().keys({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().min(10).max(20).pattern(/^[0-9]+$/).message('The phone number must be a number'),
    }),
    addressForm: Joi.object().keys({
        shippingId: Joi.number().integer().greater(0).required(),
        area: Joi.string().min(3).max(100).required(),
        street: Joi.string().min(3).max(50).required(),
        house: Joi.string().min(3).max(50).required(),
        isDefault: Joi.number().integer(),         // 0 or 1
    }),
    addressIdParams: Joi.object().keys({
        addressId: Joi.number().integer().greater(0).required(),
    }),
    langParameter: Joi.object().keys({
        lang: Joi.string().required().valid('ar', 'en')
    }),
    productIdparams: Joi.object().keys({
        productId: Joi.number().integer().greater(0).required(),
    }),
    changePasswordForm: Joi.object().keys({
        email: Joi.string().email().required(),
        oldPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
    })
};


module.exports = userSchemas;