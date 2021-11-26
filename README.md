# Pure-Match-Test


## User Stories

The following **required** functionality is completed:
### req1

- [x] Create express.js app and use postgres sql as database. 
  * Created a simple express app.
  * Created a postgres database with 2 tables, Users and Posts.
  * Used pg and sequelize packages to create User, Post models.
  
- [x] Make routes where user can register itself. Required fields of user are name, email and password. 
  * Created routes folder for Users.
  * Created an endpoint to register the users by adding their names, emails, and hashed passwords to the database.
   <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/register.png' title='register' width='' alt='register' />
  
- [x] User can login with its email and password and gets a JWT token.
  * Used jsonwebtoken package to create access and refresh tokens.
  * Created an endpoint to check if the email and password match a user from the database.
   <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/login.png' title='login' width='' alt='login' />
  
- [x] Logged in users can create a post. Post has 3 attribues title, description and a photo.
  * Created an S3 Bucket and connected it to the server.
  * Created a function to upload the image to the bucket and get the url to store in the database.
  * Created an endpoint to add a post to the database.
   * Using the access token to create the post
   <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/createPostHeader.png' title='header' width='' alt='header' />
   <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/createPost.png' title='createPost' width='' alt='createPost' />


