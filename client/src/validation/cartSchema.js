import Joi from "joi";

const cartSchema = {
    addShippingAddressForm: Joi.object().keys({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        phoneNumber: Joi.string().min(10).max(20).pattern(/^[0-9]+$/).message('The phone number must be a number'),
        shippingId: Joi.number().integer().greater(0).required(),
        area: Joi.string().min(3).max(100).required(),
        street: Joi.string().min(3).max(50).required(),
        house: Joi.string().min(3).max(50).required(),
    }),
}





export default cartSchema;