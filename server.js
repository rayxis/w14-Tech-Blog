// Built-in Modules
const path = require('path');

// External modules
require('dotenv').config();
const express = require('express');
const handlebars  = require('express-handlebars');

// Local modules
const routes = require('./src/routes/index');

const app = express();
const hbs = handlebars.create({});
// Port
const PORT = process.env.PORT || 3000;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/src/views'));
app.set('data', path.join(__dirname, '/src/data'));

//
app.use(express.json());
app.use(express.static('public'));
app.use(routes);

// Open port
const server = app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

// Handle exiting gracefully.
process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
process.on('uncaughtException', (err) => {
	console.error('Uncaught exception', err);
	handleExit();
});

function handleExit() {
	server.close(() => {
		console.log('\nServer closed');
		process.exit();
	});
}