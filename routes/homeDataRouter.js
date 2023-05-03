const express = require('express');
const {fetchHomeData, updateData} = require('../controllers/homeData');

const router = express.Router();

router.get('/', fetchHomeData);
router.post('/update', updateData);

module.exports = router;