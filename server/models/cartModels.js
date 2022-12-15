const db = require('../config/dbconfig');

async function userCartProducts(userId, lang) {
    const query =
        `SELECT  crt.id 'cartProductId', proAttach.img AS 'img', proTra.name As 'name', pro.count AS 'maxCount', pro.price AS 'originalPrice',
        CASE
            WHEN (now() > pro.offerFrom AND now() < pro.offerTo AND pro.offerPrice  < pro.price AND pro.offerPrice  != 'null') THEN pro.offerPrice
        ELSE  pro.price
        END AS  'price',
        CASE 
            WHEN (crt.count > pro.count) THEN pro.count
            ELSE crt.count
            END AS 'count',
		CASE
			WHEN (now() > pro.offerFrom AND now() < pro.offerTo AND pro.offerPrice  < pro.price AND pro.offerPrice  != 'null') THEN 1
            ELSE 0 
            END AS 'isOffer'
    FROM pido_project.cart crt JOIN products pro ON crt.productId = pro.id 
    JOIN product_attachments proAttach ON proAttach.productId = pro.id
    JOIN products_translator proTra ON pro.id = proTra.productId
    WHERE crt.userId = ? AND proTra.lang = ?
    GROUP BY  pro.id
    ORDER BY crt.id;`
    let result = await db.query(query, [userId, lang]);
    return result[0];
};

async function setCartProductCount(cartProductId, count) {
    const query =
        `UPDATE pido_project.cart SET count = ? WHERE id = ?;`;
    let result = await db.query(query, [count, cartProductId]);
    return result[0];
};

async function deleteCartProduct(userId, cartProductId) {
    const query =
        `DELETE FROM pido_project.cart WHERE id = ?;`
    let result = await db.query(query, [cartProductId, userId]);
    return result[0];
};


async function checkUserCartAddress(userId) {
    const query =
        `SELECT IFNULL(usr.cartAddressId, 'NO')  AS 'cartAddressId', IFNULL((select adrs.id from addresses adrs where adrs.userId = ? AND adrs.isDefault = 1), 'NO') AS 'defaultAddressId'
        FROM users usr where usr.id = ?;`
    let result = await db.query(query, [userId, userId]);
    return result[0][0];
};

async function getShippingInfo(userId, lang) {
    const query =
        `SELECT adrs.id AS 'id', adrs.shippingId AS 'shippingId', c.city AS 'city', adrs.area AS 'area', adrs.street 'street', adrs.house 'house', adrs.isDefault AS 'isDefault', ship.price AS 'shippingPrice', 
        CASE
            WHEN usr.cartDiscountId = null  THEN 0
            WHEN NOW() > dscnt.startDate AND NOW() < dscnt.expiryDate THEN dscnt.discount
        ELSE 0
        END AS 'discount'
    FROM users usr JOIN addresses adrs ON usr.cartAddressId = adrs.id
    JOIN shipping ship ON adrs.shippingId = ship.id
    JOIN city c ON adrs.shippingId = c.shippingId
    LEFT JOIN discount dscnt ON dscnt.id = c.discountId AND dscnt.id = usr.cartDiscountId
    WHERE usr.id = ? AND c.lang = ?`;
    let result = await db.query(query, [userId, lang]);
    return result[0];
};

async function UpdateUserCartAddress(userId, addressId) {
    const query =
        `UPDATE users usr SET usr.cartAddressId = ?, usr.cartDiscountId = null WHERE usr.id = ?;`;
    let result = await db.query(query, [addressId, userId]);
    return result[0];
};

async function CheckPromoCode(promoCode, shippingId) {
    const query =
        `SELECT
        CASE
        WHEN EXISTS(
        SELECT dis.id
        FROM discount dis JOIN city c ON dis.id = c.discountId
        WHERE dis.promoCode = ? AND dis.startDate < NOW() AND dis.expiryDate > NOW() AND c.shippingId = ? 
        limit 1
        )
        THEN (SELECT city.discountId FROM city where shippingId = ? limit 1)
        ELSE 'Invalid Promo Code'
        END AS 'discountId';`;
    let result = await db.query(query, [promoCode, shippingId, shippingId]);
    return result[0];
};

async function UpdateUserCartDiscountId(userId, discountId) {
    const query =
        `UPDATE users usr SET usr.cartDiscountId = ? WHERE usr.id = ?;`
    let result = await db.query(query, [discountId, userId]);
    return result[0];
};

async function checkCartProductIfExist(userId, productId) {
    const query =
        `SELECT id
        FROM cart c
        WHERE c.productId = ? AND c.userId= ?`;
    let result = await db.query(query, [productId, userId]);
    return result[0];
};

async function addUserCartProduct(userId, productId, count) {
    count = count ? count : 1;
    const query =
        `INSERT INTO cart(productId, count, userId) values (?, ?, ?)`
    let result = await db.query(query, [productId, count, userId]);
    return result[0];
}

async function addOrderInfo(userId, avaliableDeliveryDate) {
    const addOrderInfo_q =
        `INSERT INTO orders (userId, discountId, area, street, house, state, avaliableDeliveryDate)
        SELECT u.id, u.cartDiscountId, adrs.area, adrs.street, adrs.house, 'NEW', ?
        FROM users u JOIN addresses adrs ON u.cartAddressId = adrs.id AND adrs.userId = ?
        WHERE u.id = ?;`
    let result = await db.query(addOrderInfo_q, [avaliableDeliveryDate, userId, userId]);

    return result[0];
};

async function getOrderId(userId) {
    const query =
        `SELECT ord.id AS id FROM pido_project.orders ord WHERE ord.userId = ? ORDER BY ord.id DESC LIMIT 1;`
    let result = await db.query(query, [userId]);
    return result[0];
};

async function addOrderProducts(userId, orderId) {
    const addOrderProducts_q =
        `INSERT INTO order_products (productId, orderId, count, price)
        SELECT crt.productId, ?, crt.count,
            CASE
            WHEN (now() > pro.offerFrom AND now() < pro.offerTo AND pro.offerPrice  < pro.price) THEN pro.offerPrice * crt.count
            ELSE  pro.price * crt.count
            END AS  'price'
        FROM cart crt JOIN products pro ON crt.productId = pro.id
        WHERE crt.userId = ?;`;
    let result1 = await db.query(addOrderProducts_q, [orderId, userId]);

    return result1[0];
};

async function clearCart(userId) {
    const clearUserInfo_q = `UPDATE users u SET u.cartDiscountId = null, u.cartAddressId = null where u.id = ?`;
    let result1 = await db.query(clearUserInfo_q, [userId]);
    const clearCart_q =
        `DELETE FROM cart c where c.userId = ?`
    let result2 = await db.query(clearCart_q, [userId]);
    const updateProductsCount_q =
        `UPDATE products pro JOIN cart c ON pro.id = c.productId AND c.userId = ?
        SET pro.count = pro.count - c.count;`
    let result3 = await db.query(updateProductsCount_q, [userId]);
    return result3[0];
};

async function addUser(role) {
    const query =
        `INSERT INTO users (state, role) VALUES(1, ?);`;
    let result = await db.query(query, [role]);
    return result[0];
};

async function updateUser(id, token) {
    const query =
        `UPDATE pido_project.users SET updatedTime = now(), token = ?  WHERE id = ?;`
    let result = await db.query(query, [token, id]);
    return result;
};

async function addGuestAddress(userId, shippingId, area, street, house) {
    const query =
        `INSERT INTO addresses (userId, shippingId, area, street, house, isDefault) VALUES (?, ?, ?, ?, ?, 0);`
    let result = await db.query(query, [userId, shippingId, area, street, house]);
    return result[0];
};

async function addGuestInfo(userId, name, email, phoneNumber, addressId) {
    const query =
        `UPDATE users u SET u.name = ?, u.email = ?, u.phoneNumber = ?, u.cartAddressId = ? WHERE u.id = ?;`;
    let result = await db.query(query, [name, email, phoneNumber, addressId, userId]);
    return result[0];
};

async function findEmail(email) {
    const query =
        `SELECT id, password, state FROM pido_project.users
    WHERE email = ?`;
    let result = await db.query(query, [email]);
    return result[0];
};

async function updateGuestAddress(userId, addressId, shippingId, area, street, house) {
    const query =
        `UPDATE addresses adrs SET shippingId = ?, area = ?, street = ?, house = ? WHERE adrs.id = ? AND adrs.userId = ?;`;
    let result = await db.query(query, [shippingId, area, street, house, addressId, userId]);
    return result[0];
};

async function updateGuestInfo(userId, name, email, phoneNumber) {
    const query =
        `UPDATE users u SET u.name = ?, u.email = ?, u.phoneNumber = ? WHERE u.id = ?;`;
    let result = await db.query(query, [name, email, phoneNumber, userId]);
    return result[0];
};

async function guestShippingAddress(userId) {
    const query =
        `SELECT u.name, u.email, u.phoneNumber, adrs.shippingId, adrs.area, adrs.street, adrs.house
        FROM users u JOIN addresses adrs ON u.cartAddressId = adrs.id AND u.id = ?;`
    let result = await db.query(query, [userId]);
    return result[0];
};

module.exports = {
    userCartProducts,
    setCartProductCount,
    deleteCartProduct,
    checkUserCartAddress,
    getShippingInfo,
    UpdateUserCartAddress,
    CheckPromoCode,
    UpdateUserCartDiscountId,
    checkCartProductIfExist,
    addUserCartProduct,
    addOrderInfo,
    getOrderId,
    addOrderProducts,
    clearCart,
    addUser,
    updateUser,
    addGuestAddress,
    addGuestInfo,
    findEmail,
    updateGuestAddress,
    updateGuestInfo,
    guestShippingAddress
}