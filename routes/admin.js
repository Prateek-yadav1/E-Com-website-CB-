const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin/products')

router.get('/add-product',adminController.getAddProduct);

router.post('/add-product',adminController.postAddProduct);
router.get('/products',adminController.getProducts);


router.get('/edit',adminController.getEdit);
router.post('/edit',adminController.postEdit);

    router.get('/details',adminController.getDetails);
router.get('/delete',adminController.getDelete);
router.get('/deletereview',adminController.getDeleteReview);

module.exports = router;