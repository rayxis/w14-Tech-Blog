// Import the necessary modules
const router = require('express').Router();
const {User} = require('../../models');

// Register route
router.post('/register', async (req, res) => {
	// Destructure the request body
	const {first_name, last_name, email, password, bio} = req.body;

	try {
		// Use bcrypt to hash the user's password
		const hashedPassword = await User.hashPassword(password, 10);

		// Prepare the new user's data
		const userData = {
			first_name,
			last_name,
			email,
			password: hashedPassword,
			bio
		};

		// Create a new user
		const user = await User.create(userData);

		// If the user was created successfully
		if (user) {
			// Remove the password from user object as we don't want to send this to the front-end
			delete user.dataValues.password;

			// Save the session and assign the user object to the req.session.user property
			req.session.save(() => {
				req.session.user = user;
				return res.status(200).json({
					                            user:     user,
					                            message:  'Registration successful',
					                            redirect: '/dashboard'
				                            });
			});
		} else {
			// If the new user couldn't be created, throw an error
			throw new Error('Failed to register the new user');
		}
	} catch (err) {
		// Return an error if something went wrong during the registration process
		res.status(500).json({error: err.message});
	}
});

// Login route
router.post('/login', async (req, res) => {
	try {
		const {email, password} = req.body;
		// Find the user who matches the email provided
		const user              = await User.findOne({where: {email: email}});

		// If the user doesn't exist or the password fails validation
		if (!user) {
			// Return unauthorized error status and message
			return res.status(401).json({message: 'Invalid username or password'});
		}

		// Save the session and store the user data
		req.session.save(() => {
			req.session.user = user;
			delete user.dataValues.password;
			return res.status(200).json({
				                            user:     user,
				                            message:  'Login successful',
				                            redirect: '/dashboard'
			                            });
		});
	} catch (err) {
		// Return server error status and message if something went wrong during login
		res.status(500).json({error: err.message});
	}
});

// Logout route
router.post('/logout', async (req, res) => {
	// Destroy the session
	req.session.destroy(() => {
		// Return success status and message
		return res.status(200).json({
			                            message:  'Logout successful',
			                            redirect: '/login'
		                            });
	});
});

// Export the router
module.exports = router;