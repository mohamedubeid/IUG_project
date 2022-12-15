const loginController = require('../controllers/loginControllers');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const loginSchemas = require('../schemas/loginSchemas');

router
    .post('/register', middleware.validationMiddleware(loginSchemas.registerForm, 'body'), loginController.registerUser);

router
    .post('/login', middleware.validationMiddleware(loginSchemas.loginForm, 'body'), loginController.loginUser);

router
    .delete('/logout', middleware.authenticateToken, loginController.logOut)



module.exports = router

