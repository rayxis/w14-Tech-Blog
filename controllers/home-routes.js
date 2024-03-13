// Required libraries
const fs                       = require('fs').promises;
const router                   = require('express').Router();
// Models
const {Comment, Post, User}    = require('../models');
const {checkAuth, requireAuth} = require('./auth');

const pageData = {
	title:  'Tech Blog',
	css:    ['styles'],
	js:     ['script','user'],
	menu:   [
		{name: 'Home', link: '/', class: 'button-home'},
		{name: 'Dashboard', link: '/', class: 'button-dashboard'},
		{name: 'Login', link: '/login', class: 'button-login'},
		{name: 'Logout', link: '/user/logout', class: 'button-logout'}
	],
	footer: 'Coded and designed by Ray Beliveau in 2024'
};

// Query Data for Blog Posts
const blogQueryData = {
	include: [
		{
			model:      User,
			attributes: {exclude: ['password']}
		},
		{
			model:   Comment,
			include: [{
				model:      User,
				attributes: {exclude: ['password']}
			}]
		}]
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
	      // Get all the posts and include the user (sans password) for both the post and any comments.
	      const postData     = await Post.findAll(blogQueryData);
	      // Format the date for the post
	      pageData.blogPosts = postData.map(post => formatDate(post.get({plain: true})));
	      pageData.css.push('blog');

	      // Clean up when finished
	      res.on('finish', () => {
		      delete pageData.blogPosts;
		      pageData.css.pop();
		      pageData.js.pop();
	      }).render('blog', pageData);
      })

	// Query for specific blog post using ID and render the post page
	  .get('/blog/:id', async (req, res) => {
		  // Find the post using the id, include the user (sans password) for both the post and any comments.
		  const postData = await Post.findOne({
			                                      where: {id: req.params.id},
			                                      ...blogQueryData
		                                      });

		  // Format the date for the post and comments
		  pageData.blog         = formatDate(postData.get({plain: true}));
		  console.log(pageData);
		  pageData.blog.comments = pageData.blog.comments.map(comment => formatDate(comment));
		  pageData.css.push('blog');

		  // Clean up when finished
		  res.on('finish', () => {
			  delete pageData.blog;
			  pageData.css.pop();
		  }).render('blog', pageData);
	  })

	// Renders the form for creating a new blog post
	  .get('/blog-post', checkAuth, requireAuth, async (req, res) => {
		  pageData.css.push('blog-post');
		  pageData.js.push('blog');
		  pageData.form = JSON.parse(await fs.readFile('./views/data/blog-post.json', 'utf8'));
		  res.on('finish', () => {
			  delete pageData.form;
			  pageData.css.pop();
		  }).render('form', pageData);
	  })

	// Renders the form for login
	  .get('/login', async (req, res) => {
		  pageData.form = JSON.parse(await fs.readFile('./views/data/login.json', 'utf8'));
		  res.on('finish', () => {
			  delete pageData.form;
			  pageData.js.pop();
		  }).render('form', pageData);
	  })

	// Renders the form for registration
	  .get('/register', async (req, res) => {
		  pageData.form = JSON.parse(await fs.readFile('./views/data/register.json', 'utf8'));
		  res.render('form', pageData);
	  });

module.exports = router;