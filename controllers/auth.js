// Import the Router from express module
const router = require('express').Router();

/**
 * This middleware function checks if the user is authorized
 * (i.e., the user has an active session). If not, it sets
 * the response status to 401 (Unauthorized).
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
function checkAuth(req, res, next) {
	// Check if the session object is present and if it has a user property (indicating a logged-in user)
	if (!req.session || !req.session.user)
		// If user is not logged in, send a 401 Unauthorized status code
		res.status(401);
	// Continue with the next middleware function
	next();
}

/**
 * This middleware function checks if the user is unauthorized
 * (i.e., the response status has been set to 401 by a previous
 * middleware). If the user is unauthorized,it redirects them
 * to the '/login' route.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
function requireAuth(req, res, next) {
	// If the status code of the response is 401, the user is not authorized
	if (res.statusCode === 401)
		// Redirect unauthorized user to login page
		res.redirect('/login');
	// Continue with the next middleware function
	next();
}

// Export the middleware functions
module.exports = {checkAuth, requireAuth};