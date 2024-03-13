const router = require('express').Router();

function checkAuth(req, res, next) {
	// If the user isn't logged in send an Unauthorized code
	if (!req.session || !req.session.user) res.status(401);
	next();
}

function requireAuth(req, res, next) {
	// If the user isn't logged in, redirect them.
	if (res.statusCode === 401) res.redirect('/login');
	next();
}

// Export the function
module.exports = {checkAuth, requireAuth};