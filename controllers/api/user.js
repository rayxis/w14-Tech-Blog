const router = require('express').Router();
const {User} = require('../../models');

// Registration route
router.post('/register', async (req, res) => {
	      const {first_name, last_name, email, password, bio} = req.body;

	      try {
		      // Hash the password using bcrypt
		      const hashedPassword = await User.hashPassword(password, 10);

		      const userData = {
			      first_name,
			      last_name,
			      email,
			      password: hashedPassword,
			      bio
		      };

		      // Create a new user with the values from `userData`
		      const user = await User.create(userData);

		      // If created a new user successfully
		      if (user) {
			      // Remove the hashed password field from the returned user object
			      delete user.dataValues.password;

			      // Then, save the session with the new user data
			      req.session.save(() => {
				      req.session.user = user;
				      return res.status(200).json({
					                                  user:     user,
					                                  message:  'Registration successful',
					                                  redirect: '/dashboard'
				                                  });
			      });
		      } else {
			      // If the user couldn't be created, throw an error
			      throw new Error('Failed to register the new user');
		      }

	      } catch (err) {
		      res.status(500).json({error: err.message});
	      }
      })

	// Login route
	  .post('/login', async (req, res) => {
		  try {
			  const {email, password} = req.body;
			  const user              = await User.findOne({where: {email: email}});

			  // If there was no user match, or the password wasn't matched: fail.
			  // TODO FIX THIS. No matter how I do this, it's not working.
			  // if (!user || !checkPassword) {
			  if (!user) return res.status(401).json({message: 'Invalid username or password'});

			  // const checkPassword     = await user.checkPassword(password);
			  // if (!checkPassword) return res.status(401).json({message: 'Invalid username or password'});

			  // Make sure the session is saved, and save the user data.
			  req.session.save(() => {
				  req.session.user = user;
				  // Sanitize the user so any data sent to the client is not exposed.
				  delete user.dataValues.password;
				  console.log(req.body);
				  return res.status(200).json({
					                              user:     user,
					                              message:  'Login successful',
					                              redirect: '/dashboard'
				                              });
			  });
		  } catch (err) {
			  res.status(500).json({error: err.message});
		  }
	  })
	// Logout route
	  .post('/logout', async (req, res) => {
		  req.session.destroy(() => {
			  return res.status(200).json({
				                              message:  'Logout successful',
				                              redirect: '/login'
			                              });
		  });
	  });
// Export the router
module.exports = router;