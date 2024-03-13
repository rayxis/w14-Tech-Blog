// Load the Router
const router = require('express').Router();
// Define routes
const routes = {
	api:  require('./api'),
	blog: require('./blog-routes.js'),
	home: require('./home-routes')
};
// Use the routes
router.use('/', routes.home);
// router.use('/blog', routes.blog);
router.use('/api', routes.api);
// Export the router
module.exports = router;
