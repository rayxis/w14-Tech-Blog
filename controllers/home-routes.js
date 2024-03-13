const fs           = require('fs').promises;
const res          = require('express/lib/response');
const router       = require('express').Router();
const {Post, User} = require('../models');

const pageData = {
	title:  'Tech Blog',
	css:    ['styles'],
	menu:   [
		{name: 'Home', link: '/'},
		{name: 'Login', link: '/login'},
		{name: 'Logout', link: '/logout'}
	],
	footer: 'Coded and designed by Ray Beliveau in 2024'
};

router.get('/', async (req, res) => {
	      // List all categories and include Product model.
	      const postData = await Post.findAll({include: [{model: User}]});

	      // Convert the Sequelize model instances into plain JavaScript objects.
	      pageData.blogPosts = postData.map(post => {
		      const options = {
			      weekday: 'short',
			      year:    'numeric',
			      month:   'short',
			      day:     'numeric',
			      hour:    '2-digit',
			      minute:  '2-digit',
			      second:  '2-digit'
		      };
		      const postObj = post.get({plain: true});
		      postObj.date  = (new Date(postObj.date)).toLocaleString('en-US', options);
		      // Return the result
		      return postObj;
	      });
	      pageData.css.push('blog');
	      // Render the page
	      res.render('blog', pageData);
      })
      .get('/blog/:id', (req, res) => {
	      res.render('login', pageData);
      })
	// Blog Post
	  .get('/blog-post', async (req, res) => {
		  pageData.css.push('blog-post');
		  pageData.form = JSON.parse(await fs.readFile('./views/data/blog-post.json', 'utf8'));
		  res.render('form', pageData);
	  })
	// Login
	  .get('/login', async (req, res) => {
		  pageData.form = JSON.parse(await fs.readFile('./views/data/login.json', 'utf8'));
		  res.render('form', pageData);
	  })
	// Register
	  .get('/register', async (req, res) => {
		  pageData.form = JSON.parse(await fs.readFile('./views/data/register.json', 'utf8'));
		  res.render('form', pageData);
	  });

// Export the module
module.exports = router;