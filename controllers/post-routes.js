// Models
const router                = require('express').Router();
const {Comment, Post, User} = require('../models');

// Registration route
router.post('/register', async (req, res) => {
	try {
		const {username, password} = req.body; // Adjust to match your form keys
		const hashedPassword       = await bcrypt.hash(password, 10);
		const newUser              = await User.create({username, password: hashedPassword});
		req.session.user           = newUser; // Update to match your session object
		res.status(201).json({message: 'Registration successful'});
	} catch (err) {
		res.status(500).json({error: err.message});
	}
});

// Login route
router.post('/login', async (req, res) => {
	try {
		const {email, password} = req.body;
		const user              = await User.findOne({where: {email: email}});

		// If there was no user match, or the password wasn't matched: fail.
		if (!user || !user.checkPassword(password))
			res.status(401).json({message: 'Invalid username or password'});
		else {
			// Make sure the session is saved, and save the user data.
			req.session.save(() => {
				req.session.user = user;
				res.json({user: user, message: 'Login successful'});
			});
		}
	} catch (err) {
		res.status(500).json({error: err.message});
	}
});

router.post('/logout', async (req, res) => {})

// Blog post submission route
router.post('/blog-post', async (req, res) => {
	try {
		// Assuming req.body contains your new post data and populated authorId
		const newPost = await Post.create(req.body);
		res.status(201).json({message: 'Post created successfully'});
	} catch (err) {
		res.status(500).json({error: err.message});
	}
});

// New comment route
router.post('/comment', async (req, res) => {
	try {
		// Assuming req.body contains your comment text and populated postId and userId
		const newComment = await Comment.create(req.body);
		res.status(201).json({message: 'Comment created successfully'});
	} catch (err) {
		res.status(500).json({error: err.message});
	}
});
// Export the router
module.exports = router;