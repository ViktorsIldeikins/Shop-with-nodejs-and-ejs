const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const mainController = require('../controllers/main');
const cart = require('../controllers/cart.js');
const isAuth = require('../middleware/is-auth');

router.get('/', mainController.index);
router.get('/products', productsController.listProducts);
router.get('/cart', isAuth, cart.viewCart);
router.post('/cart', isAuth, cart.addProduct);
router.post('/cart/remove', isAuth, cart.deleteItem)
router.get('/products/:id', productsController.productDetail);
router.post('/create-order', isAuth, cart.addOrder);
router.get('/orders', isAuth, cart.viewOrders);

module.exports = router;