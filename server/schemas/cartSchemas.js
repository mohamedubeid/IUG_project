const Joi = require('joi');

const cartSchemas = {
    langParameter: Joi.object().keys({
        lang: Joi.string().required().valid('ar', 'en')
    }),
    cartProductIdParams: Joi.object().keys({
        cartProductId: Joi.number().integer().greater(0).required()
    }),
    cartProductCountBody: Joi.object().keys({
        count: Joi.number().integer().greater(0).required()
    }),
    addressIdParams: Joi.object().keys({
        addressId: Joi.number().integer().greater(0).required()
    }),
    discountBody: Joi.object().keys({
        shippingId: Joi.number().integer().greater(0).required(),
        promoCode: Joi.string().length(3).required(),
    }),
    productIdParameter: Joi.object().keys({
        productId: Joi.number().integer().greater(0).required(),
    }),
    addToCartBody: Joi.object().keys({
        productId: Joi.number().integer().greater(0).required(),
        count: Joi.number().integer().greater(0),
    }),
    orderBody: Joi.object().keys({
        avaliableDeliveryDate: Joi.date().required()
    }),
    guestShippingAdressBody: Joi.object().keys({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().min(10).max(20).pattern(/^[0-9]+$/).message('The phone number must be a number'),
        shippingId: Joi.number().integer().greater(0).required(),
        area: Joi.string().min(3).max(100).required(),
        street: Joi.string().min(3).max(50).required(),
        house: Joi.string().min(3).max(50).required(),
    }),

};


module.exports = cartSchemas;