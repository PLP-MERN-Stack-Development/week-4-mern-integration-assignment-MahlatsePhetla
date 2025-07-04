const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/auth'); 
const { upload } = require('../middleware/upload');     
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  getMyPosts,
  deletePost
} = require('../controllers/postController');          


router.get('/', getPosts);
router.get('/:id', getPostById);


router.get('/my-posts', authenticateUser, getMyPosts);
router.post('/', authenticateUser, upload.single('image'), createPost);
router.put('/:id', authenticateUser, upload.single('image'), updatePost);
router.delete('/:id', authenticateUser, deletePost);

module.exports = router;
