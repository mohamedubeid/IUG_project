const Joi = require('joi');
const categoriesSchemas = {
    //langParameter: Joi.string().required().valid('ar', 'en'),
    langParameter: Joi.object().keys({
        lang: Joi.string().required().valid('ar', 'en')
    }),
    langAndNum: Joi.object().keys({
        lang: Joi.string().required().valid('ar', 'en'),
        catId: Joi.number().integer().greater(-1).required(),
    }),
    limitQuery: Joi.object().keys({
        limit: Joi.number().integer().greater(0),
    }),
    limitPageSortQuery: Joi.object().keys({
        limit: Joi.number().integer().greater(0),
        page: Joi.number().integer().greater(0),
        sort: Joi.string(),
    }),
    langAndProId: Joi.object().keys({
        lang: Joi.string().required().valid('ar', 'en'),
        catId: Joi.number().integer().greater(0).required(),
        productId: Joi.number().integer().greater(0).required(),
    }),
    productIdParameter: Joi.object().keys({
        productId: Joi.number().integer().greater(0).required(),
    }),
    langAndSearch: Joi.object().keys({
        lang: Joi.string().required().valid('ar', 'en'),
        searchProduct: Joi.string().min(3).max(100).required(),
    })

};

module.exports = categoriesSchemas;