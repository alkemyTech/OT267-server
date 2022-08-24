const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json('respond with a resource from news');
});

module.exports = router;
