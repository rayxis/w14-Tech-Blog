// Required libraries
const fs        = require('fs').promises;
const sequelize = require('../config/connection');
const Post      = require('../models/Post');
const User      = require('../models/User');

// File paths
const paths = {
	postData: './PostData.json',
	userData: './UserData.json'
};

// Seeds data into the database
(async () => {
	// Sync database
	await sequelize.sync({force: true});
	console.log('\\n----- DATABASE SYNCED -----\n');

	// Seed user data
	const userData = JSON.parse(await fs.readFile(paths.userData, 'utf8'));
	await User.bulkCreate(userData, {individualHooks: true});
	console.log('\\n----- USERS SEEDED -----\n');

	// Seed post data
	const postData = JSON.parse(await fs.readFile(paths.postData, 'utf8'));
	await Post.bulkCreate(postData);
	console.log('\\n----- POSTS SEEDED -----\n');
})();
