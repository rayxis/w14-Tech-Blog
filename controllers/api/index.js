// Load the Router
const router = require('express').Router();
// Define routes
const routes = {
	blog: require('./blog'),
	user: require('./user')
};
// Use the routes
router.use('/blog', routes.blog);
router.use('/user', routes.user);
// Export the router
module.exports = router;
