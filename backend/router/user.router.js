const express = require('express');
const { register, login, logout } = require('../controller/user.controller');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(isAuthenticated, logout)

module.exports = router