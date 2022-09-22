const express = require('express');
const router = express.Router();
const services = require('../services/render');

router.get('/', services.homeRouts);
router.get('/add-bookmark', services.add_bookmark);
router.get('/update-bookmark', services.update_bookmark);

module.exports = router;