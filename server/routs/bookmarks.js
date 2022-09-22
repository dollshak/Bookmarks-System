const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

router.get('/', bookmarkController.getAllBookmarks);
router.post('/', bookmarkController.createBookmark);
router.delete('/:Id', bookmarkController.deleteBookmark);

module.exports = router;