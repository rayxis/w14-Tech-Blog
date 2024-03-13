// Required libraries
const fs        = require('fs').promises;
const sequelize = require('../config/connection');
const Comment   = require('../models/Comment');
const Post      = require('../models/Post');
const User      = require('../models/User');

// File paths
const paths = {
	commentData: './seeds/Comment-data.json',
	postData:    './seeds/Post-data.json',
	userData:    './seeds/User-data.json'
};

// Seeds data into the database
(async () => {
	try {
		// Sync database
		await sequelize.sync({force: true});
		console.log('\n----- DATABASE SYNCED -----\n');

		// Seed user data
		const userData = JSON.parse(await fs.readFile(paths.userData, 'utf8'));
		await User.bulkCreate(userData, {individualHooks: true});
		console.log('\n----- USERS SEEDED -----\n');

		// Seed post data
		const postData = JSON.parse(await fs.readFile(paths.postData, 'utf8'));
		await Post.bulkCreate(postData);
		console.log('\n----- POSTS SEEDED -----\n');

		// Seed post data
		const commentData = JSON.parse(await fs.readFile(paths.commentData, 'utf8'));
		await Comment.bulkCreate(commentData);
		console.log('\n----- COMMENTS SEEDED -----\n');

		// Close the database connection
		await sequelize.close();
		console.log('\n----- DATABASE CONNECTION CLOSED -----\n');
	} catch (error) {
		console.log('\n-----ERROR SEEDED -----\n');
		console.error(error);
	} finally {
		process.exit();
	}
})();
