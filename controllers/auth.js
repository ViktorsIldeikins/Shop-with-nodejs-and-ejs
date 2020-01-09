const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.loginView = (req, res, next) => {
    res.render('auth/login');
};

exports.signUpView = (req, res, next) => {
    res.render('auth/signup');
};

exports.performLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
        .then(user => {
            if (!user) {
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(matched => {
                    if (matched) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            if (err) {
                                console.log(err);
                            }
                            res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};

exports.performSignUp = (req, res, next) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    User.findOne({email: email})
        .then(result => {
            if (result) {
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12)
                .then(result => {
                    const user = new User({
                        email: email,
                        password: result,
                        cart: {items:[]}
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};

exports.performLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
