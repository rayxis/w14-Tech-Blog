const {Model, DataTypes} = require('sequelize');
const sequelize          = require('../config/connection');

// Post model for blog posts
class Comment extends Model {}

Comment.init(
	{
		// Post ID
		id:      {
			type:          DataTypes.INTEGER,
			allowNull:     false,
			primaryKey:    true,
			autoIncrement: true
		},
		// Post Date
		date:    {
			type:         DataTypes.DATE,
			allowNull:    false,
			defaultValue: DataTypes.NOW
		},
		// Post Body
		body:    {
			type:      DataTypes.TEXT,
			allowNull: false
		},
		// User
		user_id: {
			type:       DataTypes.INTEGER,
			references: {
				model: 'user',
				key:   'id'
			}
		},
		// Post ID
		post_id: {
			type:       DataTypes.INTEGER,
			references: {
				model: 'post',
				key:   'id'
			}
		}
	},
	{
		sequelize,
		timestamps:      false,
		freezeTableName: true,
		underscored:     true,
		modelName:       'comment'
	}
);
// Export module
module.exports = Comment;
