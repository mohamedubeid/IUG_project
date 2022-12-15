const db = require('../config/dbconfig');

async function findEmail(email) {
    const query =
        `SELECT id, password, state FROM pido_project.users
    WHERE email = ?`;
    let result = await db.query(query, [email]);
    return result[0];
}

async function saveUser(user) {
    const query =
        `INSERT INTO pido_project.users (name, email, phoneNumber, password)
    VALUES (?, ?, ?, ?)`
    let result = await db.query(query, [user.name, user.email, user.phoneNumber, user.password]);
    return result[0];
}

async function updateUser(id, token) {
    const query =
        `UPDATE pido_project.users SET updatedTime = now(), token = ?  WHERE id = ?;`
    let result = await db.query(query, [token, id]);
    return result;
};



async function deleteToken(id) {
    const query =
        `UPDATE pido_project.users SET token = null WHERE id = ?`
    let result = await db.query(query, [id]);
    return result;
}
module.exports = {
    findEmail,
    saveUser,
    updateUser,
    deleteToken,
}