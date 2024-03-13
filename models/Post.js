const {Model, DataTypes} = require('sequelize');
const sequelize          = require('../config/connection');

// Post model for blog posts
class Post extends Model {}

Post.init(
	{
		// Post ID
		id: {
			type:          DataTypes.INTEGER,
			allowNull:     false,
			primaryKey:    true,
			autoIncrement: true
		},
		// Post Date
		date: {
			type:         DataTypes.DATE,
			allowNull:    false,
			defaultValue: DataTypes.NOW
		},
		// Post Title
		title: {
			type:      DataTypes.STRING,
			allowNull: false
		},
		// Post Body
		body: {
			type:      DataTypes.TEXT,
			allowNull: false
		},
		// User
		user_id: {
			type:       DataTypes.INTEGER,
			allowNull:  false,
			references: {
				model: 'user',
				key:   'id'
			}
		}
	},
	{
		sequelize,
		timestamps:      false,
		freezeTableName: true,
		underscored:     true,
		modelName:       'post'
	}
);
// Export module
module.exports = Post;
