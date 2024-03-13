// Load models
const User    = require('./User');
const Post    = require('./Post');
const Comment = require('./Comment');

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

// A user has many comments
// If a User is deleted, all associated Comments are also deleted.
User.hasMany(Comment, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE'
});

// A comment belongs to a single User.
// References User's unique ID.
Comment.belongsTo(User, {
	foreignKey: 'user_id'
});

// Set a one-to-many relationship between Post and Comment
// If a Post is deleted, all associated Comments are also deleted.
Post.hasMany(Comment, {
	foreignKey: 'post_id',
	onDelete:   'CASCADE'
});

// A comment belongs to a single Post.
// References Post's unique ID.
Comment.belongsTo(Post, {
	foreignKey: 'post_id'
});

// Export models
module.exports = {User, Post, Comment};