const Product = require('../models/products.js');
const Order = require('../models/orders');

exports.addProduct = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .catch(err => console.log(err));
    res.redirect('/products');
};

exports.deleteItem = (req, res, next) => {
    req.user.removeFromCart(req.body.id)
        .then(response => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.viewCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(result => {
            res.render('shop/cart', {cartItems: result.cart.items});
        });
};

exports.addOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(result => {
            const products = result.cart.items.map( val => {
                return {amount: val.amount, productData: {...val.productId._doc}}
            });
            const order = new Order({
                userId: req.user,
                items: products
            });
             return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then( result => {
            res.redirect('/orders');
        })
        .catch( err => console.log(err));
};

exports.viewOrders = (req, res, next) => {

    Order.find({'userId': req.user._id})
        .then(orders => {
            res.render('shop/order-list', {orders});
        })
        .catch(err => console.log(err));
};