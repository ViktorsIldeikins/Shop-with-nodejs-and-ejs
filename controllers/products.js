const Products = require('../models/products');

exports.listProducts = (req, res, next) => {
    Products.find()
        .then(rows => {
            res.render('shop/product-list', {products: rows});
        })
        .catch(error => {
            console.log("error: " + error);
        });
};

exports.productDetail = (req, res, next) => {
    Products.findById(req.params.id)
        .then(response => {
            console.log(response);
            res.render('shop/product-detail', {product: response});
        })
        .catch(error => console.log('error:' + error));
};