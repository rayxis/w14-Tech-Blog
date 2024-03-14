const router = require('express').Router();
const { Post, Comment } = require('../../models');
const { checkAuth, requireAuth } = require('../auth');

router.post('/post', checkAuth, requireAuth, async (req, res) => {
	try {
		await Post.create({ ...req.body, user_id: req.session.user.id });
		return res.status(200).json({
			                            message:  'Blog post successful',
			                            redirect: '/'
		                            });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post('/comment', checkAuth, async (req, res) => {
	try {
		await Comment.create({ ...req.body, user_id: req.session.user.id });
		return res.status(200).json({
			                            message:  'Comment successful',
			                            redirect: `/blog/${req.body.post_id}`
		                            });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;