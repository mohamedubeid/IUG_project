const categoriesControllers = require('../controllers/categoriesControllers');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const categoriesSchemas = require('../schemas/categoriesSchemas');



router
    .get('/:lang/categories',
        middleware.validationMiddleware(categoriesSchemas.langParameter, 'params'),
        categoriesControllers.getAllCategories);

router
    .get('/:lang/categories/:catId/name-count',
        middleware.validationMiddleware(categoriesSchemas.langAndNum, 'params'),
        categoriesControllers.getCategoryName)

router
    .get('/:lang/products/new',
        [middleware.validationMiddleware(categoriesSchemas.langParameter, 'params'),
        middleware.validationMiddleware(categoriesSchemas.limitQuery, 'query'),
        middleware.checkToken],
        categoriesControllers.getNewProducts);

router
    .get('/:lang/products/offers',
        [middleware.validationMiddleware(categoriesSchemas.langParameter, 'params'),
        middleware.checkToken],
        categoriesControllers.getOfferProducts);

router
    .get('/:lang/categories/:catId/products',
        [middleware.validationMiddleware(categoriesSchemas.langAndNum, 'params'),
        middleware.validationMiddleware(categoriesSchemas.limitPageSortQuery, 'query'),
        middleware.checkToken
        ],
        categoriesControllers.getCategoryProducts);

router
    .get('/:lang/categories/:catId/products/:productId',
        [middleware.validationMiddleware(categoriesSchemas.langAndProId, 'params'),
        middleware.checkToken
        ], categoriesControllers.getProduct);

router
    .get('/:lang/search/:searchProduct',
        middleware.validationMiddleware(categoriesSchemas.langAndSearch, 'params'),
        categoriesControllers.getSearchProducts);


module.exports = router;