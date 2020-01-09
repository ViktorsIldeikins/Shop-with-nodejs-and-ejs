const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    res.status(404).render('page-not-found', {loggedIn: req.session.isLoggedIn});
});

module.exports = router;