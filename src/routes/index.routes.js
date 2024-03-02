const express = require('express');
const router = express.Router();
const path = require('path')

router.use((req, res, next) => {
    next();
});

// eslint-disable-next-line no-undef
router.get("/", (req, res) => { res.sendFile(path.join(__dirname, '../views', 'index.html')); });

module.exports = router
