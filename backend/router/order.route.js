const express = require('express');
const { placeorder, verifyorder, userorder, listorder, updatestatus } = require('../controller/order.controller');
const { isAuthenticated } = require('../middleware/auth')
const router = express.Router();

router.route('/create').post(isAuthenticated,placeorder);
router.route('/verify').post(verifyorder);
router.route('/myorders').post(isAuthenticated,userorder);
router.route('/list').get(listorder)
router.route('/update').post(updatestatus)
module.exports = router