const Product = require('../models/products');

exports.addProduct = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return next();
    }
    res.render('admin/add-product');
};

exports.editProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .then(response => {
            console.log(response);
            res.render('admin/edit-product', {product: response});
        })
        .catch(error => {
            console.log('error:' + error);
            res.redirect('/');
        });
};

exports.saveProduct = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    Product.findById(id)
        .then(response => {
            response.title = body.title;
            response.price = body.price;
            response.description = body.description;
            return response.save();
        })
        .then(response => {
            console.log('updated product');
            res.redirect('/admin/product-list');
        })
        .catch(err => console.log(err));
};

exports.productList = (req, res, next) => {
    Product.find()
        .then(rows => {
            res.render('admin/product-list', {products: rows});
        })
        .catch(error => {
            console.log("error: " + error);
        });
};

exports.addProductPost = (req, res, next) => {

    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        userId: req.user
    });

    product.save()
        .then(result => {
            res.redirect('/products');
        })
        .catch(error => {
            console.log(error);
        });
};

exports.deleteProduct = (req, res, next) => {
    Product.findByIdAndRemove(req.body.id)
        .then(response => res.redirect('/admin/product-list'))
        .catch(err => console.log('error on deletion: ' + err));
};
