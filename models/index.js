// Load models
const User = require('./User');
const Post = require('./Post');

// Set a one-to-many relationship between User and Post
// If a User is deleted, all associated Posts are also deleted.
User.hasMany(Post, {
	foreignKey: 'user_id',
	onDelete:   'CASCADE'
});

// A post belongs to a single User.
// References User's unique ID.
Post.belongsTo(User, {
	foreignKey: 'user_id'
});
// Export models
module.exports = {User, Post};
