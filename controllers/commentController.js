
const Comment = require('../models/Comment');
const Post = require('../models/Post');


const createComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  try {
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    
    const newComment = new Comment({
      text,
      post: postId,
      user: req.user.id, 
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error creating comment:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createComment,
};
