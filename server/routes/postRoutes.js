const express = require('express');
const { apiData, createPost, getPostData, deletePost } = require('../controllers/postController');
const router = express.Router();

router.route('/image-url').post(apiData)
router.route('/image').post(createPost)
router.route('/image').get(getPostData)
router.route('/image-data/:id').delete(deletePost);
module.exports = router;