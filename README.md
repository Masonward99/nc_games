# NC_Games API

This is the backend project from the northcoders bootcamp. The purpose of this project is to be create a RESTful api structure to allow a [frontend](https://github.com/Masonward99/FE_nc_games) to access data from the database.

During this project I learned about SQL, branches in git, Express and RESTful apis.

**Link to hosted version of this project:** https://nc-games-83l3.onrender.com/api.

## Tech used

* [NodeJS](https://nodejs.org/en)
* [ExpressJS](https://expressjs.com)
* [PostgreSQL](https://www.postgresql.org)
* [Jest](https://jestjs.io)

## Dependencies

This project uses node.Js v(18.14.2) and psql v(15.2).

## Instalation

* Clone the repository
* Run `npm i` to install dependencies.
* Create the 2 required .env files 
    1. .env.test
        1. Create a file called .env.test
        1. The contents of the file should be `PGDATABASE=nc_games_test`
    1. .env.development
        1. Create a file called .env.development
        1. The contents of this file should be `PGDATABASE=nc_games`

## Usage

* Run `npm run start` to start the application.
* Connect to API using postman/ insomnia on port 9090.
* To reseed the database run `npm run seed`


## Testing

This project was made using test driven development. To run the tests used use the script `npm run tests`.

## Available Endpoints

|Http verbs | Endpoint | Action|
|--- | ---| --- |
|GET | /api | Retrieves a list of all available endpoints.|
|GET | /api/users | GETS a list of all users |
|GET | /api/users/:username | Gets the user with that username|
|POST| /api/users/:username | Creates a new user |
|GET | /api/users/:username/reviews | Retrieves a list of all reviews by that user |
|GET | /api/users/:username/comments | Retrieves a list of all comments by that users |
|GET | /api/users/id/:id | retrieves the users with that ID|
|PATCH | /api/comments/:comments_id | Allows the number of votes for a comment to be changed|
|DELETE | /api/comments/:comments_id | Removes a comment|
|GET | /api/reviews | Gets a list of all reviews|
|POST | /api/reviews | Creates a new reviews |
|GET | /api/reviews/:review_id | Gets the review with that ID |
|PATCH | /api/reviews/:review_id | Changes the number of votes on a review to be changed|
|DELETE | /api/reviews/:review_id | Deletes the review with that ID|
|GET | /api/reviews/:review_id/comments | retrieves all comments left on a review |
|POST | /api/reviews/:review_id/comments | Creates a new comment and adds its to the review |


## List of availble endpoints

### Categories

**GET /api/categories**

Returns an array of objects which have these keys: slug, description

Post /api/categories 

Accepts a category object with a body of: slug, description and return this category object

### Reviews

**GET /api/reviews**

Returns a review object with the following properties:
owner, title, review_id, category, review_img_url, created_at, votes, designer, comment_count

***queries***

- category => returns the reviews that are in the category choosen
- sort_by => which can sort by any valid collumn (default of date)
- order => allows the data to be sorted ascending or descending

**POST /api/reviews**

Accepts an object with these properties:
owner, title, review_body, designer, category (must be a category from category list), review_img_url (defaults if not provided)

and returns the created review with the aditional properties => review_id, votes, comment_count, created_at


**GET /api/reviews/:review_id**

Returns a review object with these properties:
review_id, title, review_body, designer, review_img_url, votes, category, owner, created_at, comment_count

**PATCH /api/reviews/:review_id**

Accepts an object with the property of inc_votes and updates the votes of this review by that much returning the updated review object


**GET /api/review/:review_id/comments**

Returns an array of comments for the given review id
these comments contain these properties:
comment_id, votes, created_at, author, body, review_id
Most recent comment should be given first


**POST /api/reviews/:review_id/comments**

Accepts a body with these properties:
username, body
and returns the posted comment

### Comments

**DELETE /api/comments/:comment_id**

Deletes the comment by the given id returing a status of 204

**PATCH /api/comments/:comment_id**

Accepts an object containg the property of inc_count and increments the votes property of this comment by this ammount 
returning the updated comment object

### Users

**GET /api/users**

Returns an array of objects containing all users
the user object have these properties:
username, name, avatar_url


**GET /api/users/:username**

Returns a user object with these properties:
username, name, avatar_url

