const fs                    = require('fs').promises;
const router                = require('express').Router();
const {Comment, Post, User} = require('../models');

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

/**
 * Takes a post object and adds a formatted date string to it.
 * @param {*} postObj - The blog post object
 * @returns {*} - The blog post object with added formatted date
 */
function formatDate(postObj) {
	const dateOptions = {
		weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
		hour:    '2-digit', minute: '2-digit', second: '2-digit'
	};
	postObj.date      = (new Date(postObj.date)).toLocaleString('en-US', dateOptions);
	return postObj;
}

// Query for all blog posts from the DB and render the main blog page
router.get('/', async (req, res) => {
	      const postData     = await Post.findAll({include: [{model: User}, {model: Comment, include: [{model: User}]}]});
	      pageData.blogPosts = postData.map(post => formatDate(post.get({plain: true})));
	      pageData.css.push('blog');

		  // Clean up when finished
	      res.on('finish', () => {
		      delete pageData.blogPosts;
		      pageData.css.pop();
	      }).render('blog', pageData);
      })

	// Query for specific blog post using ID and render the post page
	  .get('/blog/:id', async (req, res) => {
		  const postData         = await Post.findOne({
			                                              where:   {id: req.params.id},
			                                              include: [{model: User}, {
				                                              model:   Comment,
				                                              include: [{model: User}]
			                                              }]
		                                              });
		  pageData.blog          = formatDate(postData.get({plain: true}));
		  pageData.blog.comments = pageData.blog.comments.map(comment => formatDate(comment));
		  pageData.css.push('blog');

		  // Clean up when finished
		  res.on('finish', () => {
			  delete pageData.blog;
			  pageData.css.pop();
		  }).render('blog', pageData);
	  })

	// Renders the form for creating a new blog post
	  .get('/blog-post', async (req, res) => {
		  pageData.css.push('blog-post');
		  pageData.form = JSON.parse(await fs.readFile('./views/data/blog-post.json', 'utf8'));
		  res.render('form', pageData);
	  })

	// Renders the form for login
	  .get('/login', async (req, res) => {
		  pageData.form = JSON.parse(await fs.readFile('./views/data/login.json', 'utf8'));
		  res.render('form', pageData);
	  })

	// Renders the form for registration
	  .get('/register', async (req, res) => {
		  pageData.form = JSON.parse(await fs.readFile('./views/data/register.json', 'utf8'));
		  res.render('form', pageData);
	  });

module.exports = router;