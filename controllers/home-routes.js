const fs     = require('fs').promises;
const res    = require('express/lib/response');
const router = require('express').Router();

const pageData = {
	title: 'Tech Blog',
	css:   ['styles'],
	menu:  [
		{name: 'Home', link: '/'},
		{name: 'Login', link: '/login'},
		{name: 'Logout', link: '/logout'}
	]
};

router.get('/', (req, res) => {
	      res.render('index', pageData);
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