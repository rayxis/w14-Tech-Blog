// Importing required modules and functions
const router = require('express').Router();
const { Post, Comment } = require('../../models');
const { checkAuth, requireAuth } = require('../auth');

// Routing to '/post' with an associated callback function
// The callback is authenticated by two middleware functions first
router.post('/post', checkAuth, requireAuth, async (req, res) => {
	try {
		// Creating a new Post, associating it with the current user
		await Post.create({ ...req.body, user_id: req.session.user.id });
		// Response on successful creation of a new Post
		return res.status(200).json({
			                            message:  'Blog post successful',
			                            redirect: '/'
		                            });
	} catch (err) {
		// Error handling
		res.status(500).json({ error: err.message });
	}
});

// Routing to '/comment' with an associated callback function
router.post('/comment', checkAuth, async (req, res) => {
	try {
		// Creating a new Comment, associating it with the current user
		await Comment.create({ ...req.body, user_id: req.session.user.id });
		// Response on successful creation of a new Comment
		return res.status(200).json({
			                            message:  'Comment successful',
			                            redirect: `/blog/${req.body.post_id}`
		                            });
	} catch (err) {
		// Error handling
		res.status(500).json({ error: err.message });
	}
});

// Exporting the router
module.exports = router;