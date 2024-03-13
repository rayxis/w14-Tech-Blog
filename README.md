# Tech Blog

## Description

The aim of this project is to provide an interactive, seamless tech blog experience for users. The blog allows users to publish articles, blog posts, thoughts, and comments. Users can signup, login, logout, view posts by other authors, and interact by commenting on others' posts.

### Features

* User Authentication: The blog provides a secure login and signup interface for users. The users' password data is securely hashed before being stored into the database ensuring a secure user experience.
* Post Management: Users can create, view, update, and delete their posts. The user interface for managing posts is intuitive and user-friendly.
* Commenting: The blog provides a platform for interactive communication where users can share their thoughts and comments on posts made by others.
* Interactive User Interface: The blog has a clean, easy-to-use, and interactive interface, making the user experience intuitive.

## User Story

```text
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Acceptance Criteria

```text
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts
```


## Installation

The Tech Blog requires Node.js and a MySQL database.

1. Clone the repository to your local machine
2. Open a terminal at the root directory
3. Run `npm install` to install all necessary packages
4. Create a `.env` file and add your MySQL information and Session Secret
5. Run the schema located in `/db/schema.sql` in MySQL to create the database
6. Run `npm start` to start the application

## Usage

The home page of the Tech Blog displays all the posts. Click on the `Login` button to create an account or login to an existing one. Once logged in, users can create a new blog post by clicking `Dashboard` and `Create Post`. Click on any post to view the post details and comments.

Link to the live application: https://tech--blog-3e22b6529126.herokuapp.com/

## Screenshots



## Credits

Generative text was used for creating seeding data. I wanted to make it fun.