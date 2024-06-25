const express = require("express");

const { getallfood, createfood, deletefood } = require("../controller/food.controller");
const router = express.Router();

router.route('/add').post(createfood)
router.route('/get').get(getallfood)
router.route('/delete/:id').delete(deletefood)

module.exports = router