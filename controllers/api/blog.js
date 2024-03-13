const router = require('express').Router();
const { Post, Comment } = require('../../models');
const { checkAuth, requireAuth } = require('../auth');

router.post('/post', checkAuth, requireAuth, async (req, res) => {
	try {
		await Post.create({ ...req.body, user_id: req.session.user.id });
		res.status(201).json({ message: 'Blog post successful' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post('/comment', checkAuth, async (req, res) => {
	try {
		await Comment.create({ ...req.body, user_id: req.session.user.id });
		res.status(201).json({ message: 'Comment successful' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;