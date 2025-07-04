const express = require('express');
const router = express.Router();
const { createComment } = require('../controllers/commentController');
const authenticateUser = require('../middleware/auth'); 


router.post('/:postId', authenticateUser, createComment); 

module.exports = router;
