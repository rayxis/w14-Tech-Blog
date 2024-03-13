const router = require('express').Router();
const {User} = require('../../models');

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
      })

	// Login route
	  .post('/login', async (req, res) => {
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
					  // Sanitize the user so any data sent to the client is not exposed.
					  delete user.dataValues.password;
					  res.json({user: user, message: 'Login successful'});
				  });
			  }
		  } catch (err) {
			  res.status(500).json({error: err.message});
		  }
	  })
	// Logout route
	  .post('/logout', async (req, res) => {
		  req.session.destroy(() => {
			  console.log('session destroyed');
			  res.status(200).json({message: 'Logout successful'});
		  });
	  });
// Export the router
module.exports = router;