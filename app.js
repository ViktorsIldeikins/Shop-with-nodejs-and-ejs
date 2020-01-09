const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin.js').router;
const shopRoutes = require('./routes/shop.js');
const authRoutes = require('./routes/auth.js');
const errorRoutes = require('./routes/error.js');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const MONGODB_URI = 'url to connect to mongodb';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'default secret', resave: false, saveUninitialized: false, store: store}));

app.use(csrfProtection);

app.use( (req, res, next) => {
    const sessionUser = req.session.user;
    if (sessionUser === undefined) {
        next();
    } else {
        User.findById(sessionUser._id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => console.log(err));
    }
});

app.use((req, res, next) => {
    res.locals.loggedIn = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    console.log('handling request');
    console.log(req.user);
    next();
});

app.use('/admin', adminRouter);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser:true})
    .then(res => {
        // const user = new User({
        //     name: ' Richard',
        //     email: 'theEmail',
        //     cart: {items:[]}
        // });
        // user.save();
        console.log('connected to db');
        app.listen(4000);
    })
    .catch(err => {
        console.log('ERROR:' + err);
    });