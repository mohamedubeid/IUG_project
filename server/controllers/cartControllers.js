require('dotenv').config();
const Cart = require('../models/cartModels');
const jwt = require('jsonwebtoken');

const getCartProducts = async (req, res) => {
    const user = req.user;
    const lang = req.params.lang;
    Cart.userCartProducts(user.id, lang).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.status(200).json({
            data: result
        });
    });
};

const setCartProduct = async (req, res) => {
    const cartProductId = req.params.cartProductId;
    const count = req.body.count;
    Cart.setCartProductCount(cartProductId, count).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.status(204).json({
            data: result
        });
    });
};

const deleteCartProduct = async (req, res) => {
    const user = req.user;
    const cartProductId = req.params.cartProductId;
    Cart.deleteCartProduct(user.id, cartProductId).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.status(200).json({
            data: result,
            msg: 'Your cart product deleted successfully !'
        });
    });
};

const addCartProduct = async (req, res) => {
    const { productId, count } = req.body;
    if (!req.user) {
        Cart.addUser("guest").then((result, err) => {
            if (err) return res.status(400).send({ msg: err });
            const guestId = result.insertId;
            const guestToken = {
                id: guestId
            }
            const accessToken = jwt.sign(guestToken, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: '12h' });
            Cart.updateUser(guestId, accessToken).then((result, err) => {
                if (err) return res.status(400).send({ msg: err });
                Cart.addUserCartProduct(guestId, productId, count).then((result, err) => {
                    if (err) return res.status(400).send({ msg: err });
                    return res.status(201).send({ msg: "Product Successfully Added To Cart", accessToken: accessToken }); //save accessToken in user session
                });
            });
        });
    } else {
        const user = req.user;
        Cart.checkCartProductIfExist(user.id, productId).then((result, err) => {
            if (err) return res.status(400).send({ msg: err });
            if (result.length == 0) {
                Cart.addUserCartProduct(user.id, productId, count).then((result, err) => {
                    if (err) return res.status(400).send({ msg: err });
                    return res.status(200).send({ msg: "Product Successfully Added To Cart", data: result, });
                });
            } else {
                return res.status(409).send({ msg: "Product Is Already In Your Cart" });
            }
        });
    };
};

const getShippingInfo = async (req, res) => {
    const user = req.user;
    const lang = req.params.lang;
    Cart.checkUserCartAddress(user.id).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        if (result.cartAddressId != 'NO') {
            Cart.getShippingInfo(user.id, lang).then((result, err) => {
                if (err) return res.status(400).send({ msg: err });
                return res.status(200).json({
                    data: result,
                });
            });
        } else if (result.defaultAddressId != 'NO') {
            Cart.UpdateUserCartAddress(user.id, result.defaultAddressId).then((resu, err) => {
                if (err) return res.status(400).send({ msg: err });
                Cart.getShippingInfo(user.id, lang).then((result, err) => {
                    if (err) return res.status(400).send({ msg: err });
                    return res.status(200).json({
                        data: result,
                    });
                });
            });
        } else {
            return res.status(424).send({ msg: 'need to select delivery address' });
        };
    });
};

const updateCartAddress = async (req, res) => {
    const user = req.user;
    const addressId = req.params.addressId;
    Cart.UpdateUserCartAddress(user.id, addressId).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.sendStatus(200);
    });
};

const checkDiscount = async (req, res) => {
    const user = req.user;
    const { promoCode, shippingId } = req.body;
    Cart.CheckPromoCode(promoCode, shippingId).then((result, err) => {
        if (err) return res.status(400).json({ msg: err });
        const discountId = result[0].discountId;
        if (discountId != "Invalid Promo Code") {
            Cart.UpdateUserCartDiscountId(user.id, discountId).then((result, err) => {
                if (err) return res.status(400).send({ msg: err });
                return res.sendStatus(204);
            });
        } else {
            return res.status(404).send({ msg: "Invalid Promo Code" });
        };
    });
};

const addToOrders = async (req, res) => {
    const user = req.user;
    const avaliableDeliveryDate = req.body.avaliableDeliveryDate;
    const dateFrom = new Date(new Date().toLocaleDateString() + ' ' + "10:00").toISOString().slice(0, 19).replace('T', ' ');
    if (avaliableDeliveryDate > dateFrom) {
        Cart.addOrderInfo(user.id, avaliableDeliveryDate).then((result1, err) => {
            if (err) return res.status(400).send({ msg: err });
            Cart.getOrderId(user.id).then((result2, err) => {
                if (err) return res.status(400).send({ msg: err });
                Cart.addOrderProducts(user.id, result2[0].id).then((result3, err) => {
                    if (err) return res.status(400).send({ msg: err });
                    Cart.clearCart(user.id).then((result4, err) => {
                        if (err) return res.status(400).send({ msg: err });
                        res.status(200).json({ msg: 'Order Added Successfully' })
                    });
                });
            });
        });
    } else {
        res.status(400).send({ msg: "Invalid Avaliable Delivery Date" });
    };
};

const addGuestShippingAddress = async (req, res) => {
    const user = req.user;
    const { name, email, phoneNumber, shippingId, area, street, house } = req.body;
    Cart.findEmail(email).then((EmailList) => {
        if (EmailList.length !== 0) {
            return res.status(409).send({ msg: "Email Is Already Exist" });
        } else {
            Cart.addGuestAddress(user.id, shippingId, area, street, house).then((result, err) => {
                if (err) return res.status(400).send({ msg: err });
                const addressId = result.insertId;
                Cart.addGuestInfo(user.id, name, email, phoneNumber, addressId).then((result, err) => {
                    if (err) return res.status(400).send({ msg: err });
                    return res.status(200).send({ msg: "Shipping Address Added Successfully" });
                });
            });
        };
    });
};

const updateGuestShippingAddress = async (req, res) => {
    const user = req.user;
    const { name, email, phoneNumber, shippingId, area, street, house } = req.body;
    const addressId = req.params.addressId;
    Cart.updateGuestAddress(user.id, addressId, shippingId, area, street, house).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        Cart.updateGuestInfo(user.id, name, email, phoneNumber).then((result, err) => {
            if (err) return res.status(400).send({ msg: err });
            return res.status(200).send({ msg: "Shipping Address Updated Successfully!" });
        });
    });
};

const guestShippingAddress = async (req, res) => {
    const user = req.user;
    Cart.guestShippingAddress(user.id).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.status(200).send({ data: result });
    });
};

module.exports = {
    getCartProducts,
    setCartProduct,
    deleteCartProduct,
    addCartProduct,
    getShippingInfo,
    updateCartAddress,
    checkDiscount,
    addToOrders,
    addGuestShippingAddress,
    updateGuestShippingAddress,
    guestShippingAddress
}
