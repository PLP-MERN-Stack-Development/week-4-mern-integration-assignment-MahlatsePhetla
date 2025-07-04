const Post = require('../models/Post');
const slugify = require('slugify');

// CREATE a post
const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const userId = req.user?.id?.toString() || req.user?._id?.toString();

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const postData = {
      title,
      content,
      category,
      author: userId,
      slug,
    };

    if (req.file) {
      postData.image = req.file.path;
    }

    const newPost = new Post(postData);
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Server error creating post', error: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const search = req.query.search || '';
    const query = {
      title: { $regex: search, $options: 'i' },
    };

    const posts = await Post.find(query)
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error('Error loading posts:', err);
    res.status(500).json({ message: 'Failed to load posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('category', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ message: 'Server error fetching post', error: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const userId = req.user?.id?.toString() || req.user?._id?.toString();

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    if (title) {
      post.slug = slugify(title, { lower: true, strict: true });
    }

    if (req.file) {
      post.image = req.file.path;
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Server error updating post', error: err.message });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const userId = req.user?.id?.toString() || req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const posts = await Post.find({ author: userId })
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).json({ message: 'Failed to load user posts', error: err.message });
  }
};

// DELETE post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id?.toString() || req.user?._id?.toString();

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }

    await post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Server error while deleting post', error: err.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  getMyPosts,
  deletePost,
};
