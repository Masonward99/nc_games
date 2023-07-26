# Northcoders House of Games API

This is the backend project from the northcoders bootcamp. The purpose of this project is to be create a RESTful api structure to allow a [frontend](https://github.com/Masonward99/FE_nc_games) to access data from the database.

During this project I learned about SQL, branches in git, Express and RESTful apis.

**Link to hosted version of this project:** https://nc-games-83l3.onrender.com/api.

## Trello

**Link to trello board used throughout this project:** https://trello.com/b/95fCAxfh/nc-games.

Above is the trello board used throughout this project. This project was the first time creating branches and pull requests, this allowed the mentors at northcoders to give feedback on the code produced.

## dependencies and creating .env files

#### dependencies

This project uses node.Js v(18.14.2) and psql v(15.2)

#### creating required .env files

This project used 3 databases during development. 

This repo uses 3 .env files; one for testing, one for development and one for prodcution
below are the names of the 3 files and the contents stored within them:

**.env.test**
`PGDATABASE=nc_games_test`

**.env.development**
`PGDATABASE=nc_games`

**.env.production**
`DATABASE_URL=postgres://bwuhyysx:RPbXY4mtDTWTaqd442g7FxgT4wfUhnI-@rogue.db.elephantsql.com/bwuhyysx`

### Scripts

`npm run test`

This project was created using test driven development, this script allows the user to run the tests used during development.

`npm run seed`

This allows the user to reseed the development database.

`npm run start`

Starts the local server for the user.


## list of availble endpoints

### categories

**GET /api/categories**

returns an array of objects which have these keys: slug, description

post /api/categories 

accepts a category object with a body of: slug, description and return this category object

### reviews

**GET /api/reviews**

return a review object with the following properties:
owner, title, review_id, category, review_img_url, created_at, votes, designer, comment_count

***queries***

- category => returns the reviews that are in the category choosen
- sort_by => which can sort by any valid collumn (default of date)
- order => allows the data to be sorted ascending or descending

**POST /api/reviews**

accepts an object with these properties:
owner, title, review_body, designer, category (must be a category from category list), review_img_url (defaults if not provided)

and returns the created review with the aditional properties => review_id, votes, comment_count, created_at


**GET /api/reviews/:review_id**

returns a review object with these properties:
review_id, title, review_body, designer, review_img_url, votes, category, owner, created_at, comment_count

**PATCH /api/reviews/:review_id**

accepts an object with the property of inc_votes and updates the votes of this review by that much returning the updated review object


**GET /api/review/:review_id/comments**

returns an array of comments for the given review id
these comments contain these properties:
comment_id, votes, created_at, author, body, review_id
Most recent comment should be given first


**POST /api/reviews/:review_id/comments**

accepts a body with these properties:
username, body
and returns the posted comment

### comments

**DELETE /api/comments/:comment_id**

deletes the comment by the given id returing a status of 204

**PATCH /api/comments/:comment_id**

accepts an object containg the property of inc_count and increments the votes property of this comment by this ammount 
returning the updated comment object

### Users

**GET /api/users**

returns an array of objects containing all users
the user object have these properties:
username, name, avatar_url


**GET /api/users/:username**

returns a user object with these properties:
username, name, avatar_url

