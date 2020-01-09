const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

router.get('/add-product', isAuth, adminController.addProduct);
router.post('/add-product', isAuth, adminController.addProductPost);
router.get('/edit-product/:id', isAuth, adminController.editProduct);
router.post('/edit-product/:id', isAuth, adminController.saveProduct);
router.get('/product-list', isAuth, adminController.productList);
router.post('/delete-product', isAuth, adminController.deleteProduct);

exports.router = router;
