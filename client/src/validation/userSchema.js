import Joi from "joi";

const userSchema = {
    profileForm: Joi.object().keys({
        name: Joi.string().trim().min(3).max(100).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        phoneNumber: Joi.string().min(10).max(20).pattern(/^[0-9]+$/).message('The phone number must be a number'),
    }),
    addressForm: Joi.object().keys({
        shippingId: Joi.number().integer().greater(0).required(),
        area: Joi.string().min(3).max(100).required(),
        street: Joi.string().min(3).max(50).required(),
        house: Joi.string().min(3).max(50).required(),
        isDefault: Joi.number().integer(),         // 0 or 1
    }),
    changePasswordForm: Joi.object().keys({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        oldPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
    })
};

export default userSchema;
