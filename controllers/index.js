// Load the Router
const router    = require('express').Router();
//
const apiRoutes = require('./api');
const home      = require('./home-routes');

router.use('/', home);
router.use('/api', apiRoutes);
// Export the router
module.exports = router;
