const userControllers = require('../controllers/userControllers');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const userSchemas = require('../schemas/userSchemas');


router
    .get('/my-profile', middleware.authenticateToken, userControllers.getUserData)

    .put('/my-profile', [
        middleware.authenticateToken,
        middleware.validationMiddleware(userSchemas.profileForm, 'body')
    ], userControllers.updateUserData)

router
    .get('/:lang/my-addresses', [
        middleware.authenticateToken,
        middleware.validationMiddleware(userSchemas.langParameter, 'params'),
    ], userControllers.getUserAddresses)  //done sent with shippingId to add in post addresses

    .post('/my-addresses', [
        middleware.authenticateToken,
        middleware.validationMiddleware(userSchemas.addressForm, 'body')
    ], userControllers.addUserAddress) //sent shippingId instead of city

    .put('/my-addresses/:addressId', [
        middleware.authenticateToken,
        middleware.validationMiddleware(userSchemas.addressForm, 'body'),
        middleware.validationMiddleware(userSchemas.addressIdParams, 'params'),
    ], userControllers.updateUserAddress) //sent shippingId instead of city

    .delete('/my-addresses/:addressId', [
        middleware.validationMiddleware(userSchemas.addressIdParams, 'params'),
        middleware.authenticateToken
    ], userControllers.deleteUserAddress)

router
    .get('/:lang/shipping',
        middleware.validationMiddleware(userSchemas.langParameter, 'params'),
        userControllers.getShipping)  //validate lang

router
    .get('/:lang/products/favorites', [
        middleware.authenticateToken,
        middleware.validationMiddleware(userSchemas.langParameter, 'params'),
    ], userControllers.getFavorietProducts)

    .post('/products/favorites/:productId', [
        middleware.validationMiddleware(userSchemas.productIdparams, 'params'),
        middleware.authenticateToken
    ], userControllers.addFavoriteProduct)

    .delete('/products/favorites/:productId', [
        middleware.validationMiddleware(userSchemas.productIdparams, 'params'),
        middleware.authenticateToken
    ], userControllers.deleteFavoriteProduct)

router
    .put('/change-password', [
        middleware.validationMiddleware(userSchemas.changePasswordForm, 'body'),
        middleware.authenticateToken
    ], userControllers.changePassword)

    
module.exports = router;