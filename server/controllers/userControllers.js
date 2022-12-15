const User = require('../models/userModels');
const bcrypt = require("bcryptjs");


const getUserData = async (req, res) => {
    const user = req.user;
    User.userData(user.id).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.status(200).json({
            data: result
        });
    });
};

const updateUserData = async (req, res) => {
    const user = req.user;
    const userData = req.body;       //validation in front
    User.updateUser(user.id, userData.name, userData.email, userData.phoneNumber).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.status(200).json({
            data: result,
            msg: 'Your data updated successfully'
        });
    });
};

const getUserAddresses = async (req, res) => {
    const user = req.user;
    const lang = req.params.lang;
    User.userAddresses(user.id, lang).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.status(200).json({
            data: result
        });
    });
};

const addUserAddress = async (req, res) => {
    const user = req.user;
    const userAddress = req.body;
    if (userAddress.isDefault == 1) {
        await User.clearUserDefault(user.id);
    }
    User.addAddress(user.id, userAddress.shippingId, userAddress.area, userAddress.street, userAddress.house, userAddress.isDefault)
        .then((result, err) => {
            if (err) return res.status(400).send({ msg: err });
            return res.status(200).json({
                data: result,
                msg: 'Your Address added successfully'
            });
        });
};

const updateUserAddress = async (req, res) => {
    const user = req.user;
    const userAddress = req.body;
    const addressId = req.params.addressId;
    if (userAddress.isDefault == 1) {
        await User.clearUserDefault(user.id);
    };
    User.updateAddress(user.id, userAddress.shippingId, userAddress.area, userAddress.street, userAddress.house, userAddress.isDefault, addressId)
        .then((result, err) => {
            if (err) return res.status(400).send({ msg: err });
            return res.status(200).json({
                data: result,
                msg: 'Your Address updated successfully',
            });
        });
};

const deleteUserAddress = async (req, res) => {
    const user = req.user;
    const addressId = req.params.addressId;
    User.deleteAddress(user.id, addressId).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.status(200).json({
            data: result,
            msg: 'Your Address deleted successfully',
        });
    });
};

const getShipping = async (req, res) => {
    const lang = req.params.lang;
    User.shipping(lang).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.status(200).json({
            data: result,
        });
    });
};

const getFavorietProducts = async (req, res) => {
    const user = req.user;
    const lang = req.params.lang;
    User.favorietProducts(user.id, lang).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.status(200).json({
            data: result,
        });
    });
};

const addFavoriteProduct = async (req, res) => {
    const user = req.user;
    const productId = req.params.productId;
    User.isProductAlreadyInFavorites(user.id, productId).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        if (result.length == 0) {
            User.addFavorite(user.id, productId).then((result, err) => {
                if (err) return res.status(400).send({ msg: err });
                return res.status(200).json({
                    data: result,
                    msg: 'added to favorite',
                });
            });
        } else {
            return res.status(409).json({
                data: result,
                msg: 'product already in favorites',
            });
        };
    });
};

const deleteFavoriteProduct = async (req, res) => {
    const user = req.user;
    const productId = req.params.productId;
    User.deleteFavorite(user.id, productId).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.status(200).json({
            data: result,
            msg: 'Removed from favorite'
        });
    });
};

const changePassword = async (req, res) => {
    const user = req.user;
    const userBody = req.body;
    User.getEmailAndPass(user.id).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        if (result[0].email != userBody.email) {
            return res.status(404).send({ msg: "invalid email" });
        }
        bcrypt.compare(userBody.oldPassword, result[0].password, (bErr, bResult) => {
            if (bErr) {
                return res.status(401).send({
                    msg: "mail or password is incorrect!"
                });
            } else if (!bResult) {
                return res.status(400).send({ msg: "Invalid Password!" });
            } else {
                bcrypt.hash(userBody.newPassword, 10, (err, hash) => {
                    if (err) throw err;
                    const hashPassword = hash;
                    User.saveNewPassword(user.id, hashPassword).then((result, err) => {
                        if (err) return res.status(400).send({ msg: err });
                        return res.status(200).json({
                            data: result,
                            msg: 'Password updated successfully! '
                        });
                    });
                });
            };
        });
    });
};

module.exports = {
    getUserData,
    updateUserData,
    getUserAddresses,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    getShipping,
    getFavorietProducts,
    addFavoriteProduct,
    deleteFavoriteProduct,
    changePassword
}
