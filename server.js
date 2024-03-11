// Built-in Modules
const path = require('path');

// External modules
require('dotenv').config();
const express        = require('express');
const session        = require('express-sessions');
const sequelize      = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Local modules
const routes = require('./routes/index');

// Setup handlebars
const handlebars = require('express-handlebars');
const hbs        = handlebars.create({});

// Setup the application port
const PORT = process.env.PORT || 3000;

// Set up sessions with cookies
const sess = {
	secret:            process.env.SESSION_SECRET,
	cookie:            {
		maxAge: 24 * 60 * 60 * 1000 // expires after 1 day
	},
	resave:            false,
	saveUninitialized: true,
	store:             new SequelizeStore({db: sequelize})
};
// Instantiate and configure Express
const app  = express();
app.engine('handlebars', hbs.engine)
	// Set the views and data directories
   .set('view engine', 'handlebars')
   .set('views', path.join(__dirname, '/src/views'))
   .set('data', path.join(__dirname, '/src/data'))
	// Use sessions, parse JSON, serve static files and include routes.
   .use(session(sess))
   .use(express.json())
   .use(express.static('public'))
   .use(routes);

// Start the server
const server = app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

// Handle exiting gracefully for various exit signals.
// On uncaught exceptions, exit with a failure code.
process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
process.on('uncaughtException', (err) => {
	console.error('Uncaught exception', err);
	handleExit();
});

/**
 * Function to handle the server exit gracefully.
 *
 * @param {number} code - An optional exit code, defaults to 0
 */
function handleExit(code = 0) {
	server.close(() => {
		console.log('\nServer closed');
		process.exit(code);
	});
}