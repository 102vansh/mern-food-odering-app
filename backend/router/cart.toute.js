const express = require("express");
const { addtocart, removecart, fetchcartdata } = require("../controller/cart.controller");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();
router.route('/add').post(isAuthenticated,addtocart)
router.route('/delete').post(isAuthenticated,removecart)
router.route('/get').post(isAuthenticated,fetchcartdata)
module.exports = router