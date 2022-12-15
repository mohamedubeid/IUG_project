const jwt = require('jsonwebtoken');
const db = require('../config/dbconfig');

const validationMiddleware = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        const valid = error == null;
        if (valid) { next(); }
        else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            res.status(422).json({ error: message })
        };
    };
};

const authenticateToken = (req, res, next) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return res.status(401).send({
            msg: 'Please provide the token'
        })
    };
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, user) => {
        if (err) return res.sendStatus(403);
        db.query(`SELECT token, state FROM pido_project.users WHERE id = ?`, [user.id]).then((result, err) => {
            if (err) return res.sendStatus(400);
            const userToken = result[0][0].token;
            if (!userToken || token != userToken) {
                return res.sendStatus(401);
            } else if (result[0][0].state == 0) {
                return res.sendStatus(403);
            } else {
                req.user = user;
                next();
            }
        });
    });
};

const checkAddToCartToken = (req, res, next) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return next();
    };
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, user) => {
        if (err) return res.sendStatus(403);
        db.query(`SELECT token, state FROM pido_project.users WHERE id = ?`, [user.id]).then((result, err) => {
            if (err) return res.sendStatus(400);
            const userToken = result[0][0].token;
            if (!userToken || token != userToken) {
                return res.sendStatus(401);
            } else if (result[0][0].state == 0) {
                return res.sendStatus(403);
            } else {
                req.user = user;
                next();
            }
        });
    });
};

const checkToken = (req, res, next) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return next();
    };
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, user) => {
        if (err) return next();
        db.query(`SELECT token, state FROM pido_project.users WHERE id = ?`, [user.id]).then((result, err) => {
            if (err) return next();;
            const userToken = result[0][0].token;
            if (!userToken || token != userToken) {
                return next();
            } else if (result[0][0].state == 0) {
                return next();
            } else {
                req.user = user;
                next();
            }
        });
    });
};
module.exports = {
    validationMiddleware,
    authenticateToken,
    checkAddToCartToken,
    checkToken
}