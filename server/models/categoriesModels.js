const db = require('../config/dbconfig');

async function getCategories(lang) {
    const query =
        `SELECT cat.id as id, tra.categoryName as categoryName, cat.categoryImg as categoryImg
FROM categories cat join categories_translator tra on cat.id = tra.categoryId
WHERE lang = ?`
    let result = await db.query(query, [lang]);
    return result[0];
};

async function categoryName(lang, catId) {
    const query =
        `select categoryName, (SELECT COUNT(products.id) FROM pido_project.products  WHERE pido_project.products.categoryId = ?) as productsCount
        from categories_translator
        where pido_project.categories_translator.categoryId = ? AND pido_project.categories_translator.lang = ?;`
    let result = await db.query(query, [catId, catId, lang]);
    return result[0];
};

async function newProducts(lang, limit, userId) {
    const queryWithOutUserId =
        `SELECT pro.id as id,pro.categoryId AS categoryId,catTra.categoryName AS categoryName, pro.price AS price, pro.offerPrice AS 'offerPrice', pro.offerFrom AS 'offerFrom', pro.offerTo AS 'offerTo', attach.img as img, tra.name AS name
        FROM products pro  JOIN product_attachments attach ON pro.id = attach.productId JOIN products_translator tra ON pro.id = tra.productId JOIN categories_translator catTra ON pro.categoryId = catTra.categoryId
        where tra.lang = ? and catTra.lang= ?
        GROUP BY ID
        order by pro.createdTime DESC
        limit ?;`;
    const queryWithUserId =
        `SELECT  IFNULL(fav.id, 0) AS favId, 
        pro.id AS id,
        pro.categoryId AS categoryId,
        catTra.categoryName AS categoryName,
        pro.price AS price,
        pro.offerPrice AS 'offerPrice',
        pro.offerFrom AS 'offerFrom',
        pro.offerTo AS 'offerTo',
        attach.img as img,
        tra.name AS name
        FROM products pro  JOIN product_attachments attach ON pro.id = attach.productId 
        JOIN products_translator tra ON pro.id = tra.productId 
        JOIN categories_translator catTra ON pro.categoryId = catTra.categoryId
        LEFT JOIN favorites fav ON fav.productId = pro.id AND fav.userId = ?
        WHERE tra.lang = ? AND catTra.lang= ? AND pro.count > 0
        GROUP BY pro.ID
        ORDER BY pro.createdTime DESC
        LIMIT ?;`;
    if (userId != null) {
        let result = await db.query(queryWithUserId, [userId, lang, lang, limit]);
        return result[0];
    } else {
        let result = await db.query(queryWithOutUserId, [lang, lang, limit]);
        return result[0];
    }

};

async function offerProducts(lang, userId) {
    const queryWithOutUserId =
        `SELECT pro.id as id,pro.categoryId AS categoryId,catTra.categoryName AS categoryName, pro.price AS price, pro.offerPrice AS 'offerPrice', pro.offerFrom AS 'offerFrom', pro.offerTo AS 'offerTo', attach.img as img, tra.name AS name
    FROM products pro  JOIN product_attachments attach ON pro.id = attach.productId JOIN products_translator tra ON pro.id = tra.productId JOIN categories_translator catTra ON pro.categoryId = catTra.categoryId
    where tra.lang = ? AND catTra.lang = ? AND now() > pro.offerFrom AND now() < pro.offerTo AND pro.offerPrice  < pro.price AND pro.offerPrice  != 'null'
    GROUP BY ID;`;
    const queryWithUserId =
        `SELECT IFNULL(fav.id, 0) AS favId,
        pro.id as id, pro.categoryId AS categoryId,
        catTra.categoryName AS categoryName,
        pro.price AS price,
        pro.offerPrice AS 'offerPrice',
        pro.offerFrom AS 'offerFrom',
        pro.offerTo AS 'offerTo',
        attach.img as img,
        tra.name AS name
        FROM products pro  JOIN product_attachments attach ON pro.id = attach.productId 
        JOIN products_translator tra ON pro.id = tra.productId 
        JOIN categories_translator catTra ON pro.categoryId = catTra.categoryId
        LEFT JOIN favorites fav ON fav.productId = pro.id AND fav.userId = ?
        WHERE tra.lang = ? AND catTra.lang = ? AND now() > pro.offerFrom AND now() < pro.offerTo AND pro.offerPrice  < pro.price AND pro.offerPrice  != 'null'
        GROUP BY ID;`;
    if (userId != null) {
        let result = await db.query(queryWithUserId, [userId, lang, lang]);
        return result[0];
    } else {
        let result = await db.query(queryWithOutUserId, [lang, lang]);
        return result[0];
    }

};


async function product(lang, productId, catId, userId) {
    const queryWithOutUserId =
        `SELECT  proTra.name AS productName,catTra.categoryName AS categoryName, proTra.productDesc AS 'desc', pro.price AS price, pro.offerPrice AS offerPrice, pro.offerFrom AS 'offerFrom', pro.offerTo AS 'offerTo', pro.count AS count
    FROM products pro  JOIN products_translator proTra ON pro.id = proTra.productId JOIN categories_translator catTra ON pro.categoryId = catTra.categoryId
    WHERE proTra.lang = ?  AND pro.id = ? AND catTra.lang = ? AND pro.categoryId = ?;`;
    const queryWithUserId =
        `SELECT 
        proTra.name AS productName,
        catTra.categoryName AS categoryName,
        proTra.productDesc AS 'desc',
        pro.price AS price,
        pro.offerPrice AS offerPrice,
        pro.offerFrom AS 'offerFrom',
        pro.offerTo AS 'offerTo',
        pro.count AS 'maxCount',
        crt.count AS 'count',
        crt.id AS 'cartProductId',
        IFNULL(fav.id, 0) AS favId
        FROM products pro  JOIN products_translator proTra ON pro.id = proTra.productId 
        JOIN categories_translator catTra ON pro.categoryId = catTra.categoryId
        JOIN cart crt ON crt.productId = pro.id AND crt.userId = ?
        LEFT JOIN favorites fav ON fav.productId = pro.id AND fav.userId = ?
        WHERE proTra.lang = ?  AND pro.id = ? AND catTra.lang = ? AND pro.categoryId = ?;`
    if (userId != null) {
        let result = await db.query(queryWithUserId, [userId, userId, lang, productId, lang, catId]);
        console.log(result[0])
        return result[0];
    } else {
        let result = await db.query(queryWithOutUserId, [lang, productId, lang, catId]);
        return result[0];
    }
};

async function productImages(productId) {
    const query =
        `select  img 
    from  product_attachments
    where productId = ?;`;
    let result = await db.query(query, [productId]);
    return result[0];
};

async function searchProduct(lang, searchProduct) {
    const query =
        `SELECT pro.id as id, pro.categoryId AS categoryId, catTra.categoryName AS categoryName, pro.price AS price, pro.offerPrice AS 'offerPrice', pro.offerFrom AS 'offerFrom', pro.offerTo AS 'offerTo', attach.img as img, tra.name AS name
    FROM products pro  JOIN product_attachments attach ON pro.id = attach.productId JOIN products_translator tra ON pro.id = tra.productId join categories_translator catTra ON pro.categoryId = catTra.categoryId
    where tra.lang = ?  AND tra.name LIKE ?
    GROUP BY ID
    limit 12;`;
    searchProduct = '%' + searchProduct + '%';
    let result = await db.query(query, [lang, searchProduct]);
    return result[0];
};

async function categoryProducts(lang, catId, limit, page, sort, userId) {
    const queryWithOutUserId =
        `SELECT pro.id AS id, pro.categoryId AS categoryId, catTra.categoryName AS categoryName, pro.price AS price, pro.offerPrice AS 'offerPrice', pro.offerFrom AS 'offerFrom', pro.offerTo AS 'offerTo', attach.img as img, tra.name AS name
        FROM products pro  JOIN product_attachments attach ON pro.id = attach.productId JOIN products_translator tra ON pro.id = tra.productId JOIN categories_translator catTra ON pro.categoryId = catTra.categoryId
        WHERE tra.lang = ? and pro.categoryId = ? AND catTra.lang = ? AND pro.count > 0
        GROUP BY ID
        ${sort ? ` ORDER BY ${sort.toLowerCase() == 'new' ? 'createdTime DESC' : sort}` : ''}
        ${limit ? `limit ${limit}` : `limit ${page}, 16`} `; /*2 to 16*/
    const queryWithUserId =
        `SELECT  IFNULL(fav.id, 0)  AS favId, pro.id as id, pro.categoryId AS categoryId, catTra.categoryName AS categoryName, pro.price AS price, pro.offerPrice AS 'offerPrice', pro.offerFrom AS 'offerFrom', pro.offerTo AS 'offerTo', attach.img as img, tra.name AS name
        FROM products pro  JOIN product_attachments attach ON pro.id = attach.productId 
        JOIN products_translator tra ON pro.id = tra.productId 
        JOIN categories_translator catTra ON pro.categoryId = catTra.categoryId
        LEFT JOIN favorites fav ON fav.productId = pro.id AND fav.UserId = ?
        WHERE tra.lang = ? AND pro.categoryId = ? AND catTra.lang = ? AND pro.count > 0
        GROUP BY ID
        ${sort ? ` ORDER BY ${sort.toLowerCase() == 'new' ? 'createdTime DESC' : sort}` : ''}
        ${limit ? `limit ${limit}` : `limit ${page}, 16`} `;
    if (userId != null) {
        let result = await db.query(queryWithUserId, [userId, lang, catId, lang]);
        return result[0];
    } else {
        let result = await db.query(queryWithOutUserId, [lang, catId, lang]);
        return result[0];
    }
};


module.exports = {
    getCategories,
    categoryName,
    newProducts,
    offerProducts,
    categoryProducts,
    product,
    productImages,
    searchProduct
};