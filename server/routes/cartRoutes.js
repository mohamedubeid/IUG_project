const cartControllers = require('../controllers/cartControllers');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const cartSchemas = require('../schemas/cartSchemas');

router
    .get('/cart/:lang/products', [
        middleware.authenticateToken,
        middleware.validationMiddleware(cartSchemas.langParameter, 'params'),
    ], cartControllers.getCartProducts)

    .put('/cart/products/:cartProductId', [
        middleware.validationMiddleware(cartSchemas.cartProductIdParams, 'params'),
        middleware.validationMiddleware(cartSchemas.cartProductCountBody, 'body')
    ], cartControllers.setCartProduct)

    .delete('/cart/products/:cartProductId', [
        middleware.authenticateToken,
        middleware.validationMiddleware(cartSchemas.cartProductIdParams, 'params'),
    ], cartControllers.deleteCartProduct)

    .post('/cart/products', [
        middleware.checkAddToCartToken,
        // middleware.validationMiddleware(cartSchemas.addToCartBody, 'body'),
    ], cartControllers.addCartProduct)

router
    .get('/cart/:lang/shipping-info', [
        middleware.authenticateToken,
        middleware.validationMiddleware(cartSchemas.langParameter, 'params'),
    ], cartControllers.getShippingInfo)

router
    .put('/cart/adresses/:addressId', [
        middleware.authenticateToken,
        middleware.validationMiddleware(cartSchemas.addressIdParams, 'params'),
    ], cartControllers.updateCartAddress)


router
    .put('/cart/discount', [
        middleware.authenticateToken,
        middleware.validationMiddleware(cartSchemas.discountBody, 'body'),
    ], cartControllers.checkDiscount)

router
    .post('/cart/order', [
        middleware.authenticateToken,
        middleware.validationMiddleware(cartSchemas.orderBody, 'body'),
    ], cartControllers.addToOrders)

router
    .post('/cart/guest/shipping-address', [
        middleware.authenticateToken,
        middleware.validationMiddleware(cartSchemas.guestShippingAdressBody, 'body'),
    ], cartControllers.addGuestShippingAddress)

    .put('/cart/guest/shipping-address/:addressId', [
        middleware.authenticateToken,
        middleware.validationMiddleware(cartSchemas.guestShippingAdressBody, 'body'),
        middleware.validationMiddleware(cartSchemas.addressIdParams, 'params')
    ], cartControllers.updateGuestShippingAddress)

    .get('/cart/guest/shipping-address',
        middleware.authenticateToken,
        cartControllers.guestShippingAddress)

module.exports = router;