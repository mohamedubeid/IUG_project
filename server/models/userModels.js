const db = require('../config/dbconfig');



async function userData(id) {
    const query =
        `SELECT name, email, phoneNumber FROM pido_project.users WHERE id = ?; `;
    let result = await db.query(query, [id]);
    return result[0];
};


async function updateUser(id, name, email, phoneNumber) {
    const query =
        `UPDATE pido_project.users SET name = ?, email = ?, phoneNumber = ? WHERE id = ?;`;
    let result = await db.query(query, [name, email, phoneNumber, id]);
    return result[0];
};

async function userAddresses(userId, lang) {
    const query =
        `SELECT adrs.id AS id,c.city AS 'city', adrs.shippingId AS shippingId, adrs.area AS area, adrs.street AS street, adrs.house AS house, adrs.isDefault AS isDefault
        FROM pido_project.addresses adrs JOIN pido_project.city c ON adrs.shippingId = c.shippingId
        WHERE adrs.userId = ? AND c.lang = ?
        ORDER BY  adrs.isDefault DESC, c.city;
        `;
    let result = await db.query(query, [userId, lang]);
    return result[0];
};

async function clearUserDefault(id) {
    const query =
        `UPDATE pido_project.addresses SET isDefault = 0 WHERE userId = ? AND isDefault = 1 ;`;
    let result = await db.query(query, [id]);
    return result;
}

async function addAddress(userId, shippingId, area, street, house, isDefault) {
    const query =
        `INSERT INTO pido_project.addresses (userId, shippingId, area, street, house, isDefault) VALUES (?, ?, ?, ?, ?, ?);`;
    let result = await db.query(query, [userId, shippingId, area, street, house, isDefault]);
    return result[0];
};

async function updateAddress(userId, shippingId, area, street, house, isDefault, addressId) {
    const query =
        `UPDATE pido_project.addresses SET shippingId = ?, area = ?, street = ?, house = ?, isDefault = ? WHERE userId = ? AND id = ?;`;
    let result = await db.query(query, [shippingId, area, street, house, isDefault, userId, addressId]);
    return result[0];
};

async function deleteAddress(userId, addressId) {
    const query =
        `DELETE FROM pido_project.addresses WHERE id = ? AND userId = ?;`
    let result = await db.query(query, [addressId, userId]);
    return result[0];
};

async function shipping(lang) {
    const query =
        `SELECT c.city, c.shippingId from pido_project.city c WHERE c.lang = ?`;
    let result = await db.query(query, [lang]);
    return result[0];
}

async function favorietProducts(userId, lang) {
    const query =
        `SELECT pro.id AS id, proTra.name, proAttach.img, pro.price, pro.offerPrice, pro.offerTo, pro.offerFrom, pro.categoryId
        FROM pido_project.favorites fav JOIN pido_project.products pro ON fav.productId = pro.id 
        JOIN pido_project.product_attachments proAttach ON proAttach.productId = fav.productId 
        JOIN pido_project.products_translator proTra ON proTra.productId = fav.productId
        WHERE fav.userId = ? AND proTra.lang = ?
        GROUP BY pro.id;`;
    let result = await db.query(query, [userId, lang]);
    return result[0];
};

async function isProductAlreadyInFavorites(userId, productId) {
    const query =
        `SELECT id from pido_project.favorites WHERE userId = ? AND productId = ?;`;
    let result = await db.query(query, [userId, productId]);
    return result[0];
}

async function addFavorite(userId, productId) {
    const query =
        `INSERT INTO favorites (userId, productId) values (?, ?)`;
    let result = await db.query(query, [userId, productId]);
    return result[0];
};

async function deleteFavorite(userId, productId) {
    const query =
        `DELETE FROM pido_project.favorites WHERE userId = ? AND productId = ?;`;
    let result = await db.query(query, [userId, productId]);
    return result[0];
};

async function getEmailAndPass(id) {
    const query =
        `SELECT email, password FROM pido_project.users WHERE id = ?;`;
    let result = await db.query(query, [id]);
    return result[0];
};

async function saveNewPassword(id, password) {
    const query =
        `UPDATE pido_project.users SET password = ? WHERE id = ?;`;
    let result = await db.query(query, [password, id]);
    return result[0];
};

module.exports = {
    userData,
    updateUser,
    userAddresses,
    clearUserDefault,
    addAddress,
    updateAddress,
    deleteAddress,
    shipping,
    favorietProducts,
    isProductAlreadyInFavorites,
    addFavorite,
    deleteFavorite,
    getEmailAndPass,
    saveNewPassword,
}