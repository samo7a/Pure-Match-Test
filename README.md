# Pure-Match-Test

## User Stories

The following **required** functionality is completed:

### req1

- [x] Create express.js app and use postgres sql as database.
  - Created a simple express app.
  - Created a postgres database with 2 tables, Users and Posts.
  - Used pg and sequelize packages to create User, Post models.
- [x] Make routes where user can register itself. Required fields of user are name, email and password.

  - Created routes folder for Users.
  - Created an endpoint to register the users by adding their names, emails, and hashed passwords to the database.

   <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/register.png' title='register' width='' alt='register' />

- [x] User can login with its email and password and gets a JWT token.

  - Used jsonwebtoken package to create access and refresh tokens.
  - Created an endpoint to check if the email and password match a user from the database.

   <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/login.png' title='login' width='' alt='login' />

- [x] Logged in users can create a post. Post has 3 attribues title, description and a photo.

  - Created an S3 Bucket and connected it to the server.
  - Created a function to upload the image to the bucket and get the url to store in the database.
  - Created an endpoint to add a post to the database.
  - Using the access token to create the post

    <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/createPostHeader.png' title='header' width='' alt='header' />
   <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/createPost.png' title='createPost' width='' alt='createPost' />

### req2

- [x] A post will have an attribute when it was created.

  - Modified the database to have createdAt field of type "date".
  - Modified the Post model to have createdAt field.

  <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/createdAt.png' title='createdAt' width='' alt='createdAt' />

- [x] Post returning api will calculate the time difference like 2s ago, 10d ago, 4w ago, 8m ago and 1yr ago.

  - Created a function to calculate the time difference.
  - Created an endpoint to get all the posts for a specific user.
  - Added the time difference to the response.

   <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/getPostWithTime.png' title='timeDifference' width='' alt='timeDifference' />

- [x] A post can have multiple photos but atmost 5.

  - Changed the upload middlefunction to accept at most 5 files
  - Changed the datatype of the image url from a String to array of Strings.

   <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/fivePhotos.png' title='fivePhotos' width='' alt='fivePhotos' />

- [x] A post can be editied.
  - Created an S3 Bucket and connected it to the server.
  - Created a function to upload the image to the bucket and get the url to store in the database.
  - Created an endpoint to add a post to the database.
  - Using the access token to create the post
    <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/createPostHeader.png' title='header' width='' alt='header' />
    <img src='https://github.com/samo7a/Pure-Match-Test/blob/req1/readmeImages/createPost.png' title='createPost' width='' alt='createPost' />
