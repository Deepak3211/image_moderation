const express = require('express');
const { apiData, createPost, getPostData } = require('../controllers/postController');
const router = express.Router();

router.route('/image-url').post(apiData)
router.route('/image').post(createPost)
router.route('/image').get(getPostData)
module.exports = router;