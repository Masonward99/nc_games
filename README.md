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

* Clone the repository [here](https://github.com/Masonward99/nc_games.git)
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
* To reseed the database use `npm run seed`.


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


### Categories

***Example Category Object***

```json
{
    "description": "Players attempt to uncover each other's hidden role",
    "slug": "Social deduction"
}
```


**GET /api/categories**

Returns an array of all categories.


**Post /api/categories** 

Creates a new category and responds with the new category.

***Accepted body***
```json
{
    "Slug":"Name of category, String.",
    "description":"Description of category, String."
}
```

### Reviews

***Example review object***

```json
{
    "title": "One Night Ultimate Werewolf",
    "designer": "Akihisa Okui",
    "owner": "happyamy2016",
    "review_img_url": "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "category": "hidden-roles",
    "created_at": "2018-05-30T15:59:13.341Z",
    "votes": 0,
    "comment_count": 6
}
```

**GET /api/reviews**

Serves an array of all reviews.

***Queries***

- category => returns the reviews that are in the category choosen
- sort_by => which can sort by any valid collumn (default of date)
- order => allows the data to be sorted ascending or descending

**POST /api/reviews**

Posts a new review to reviews, serving the new review object.

***Accepted Body***
```JSON
{
    "owner" : "Username of the user who created the review. String (From users)",
    "title": "Title of the review. String",
    "review_body":"Body of the review. String.",
    "designer": "The designer of the board game. String.",
    "category": "Category of the review. String (from categories).",
    "review_img_url": "Img url for the review, will default if not specified. String"
}
```



**GET /api/reviews/:review_id**

Returns the review object of the review with the specified id.

**PATCH /api/reviews/:review_id**

Accepts an object with the property of inc_votes and updates the votes of this review by that much returning the updated review object.

***Accepted Body***
```json
{
    "inc_votes":"Amount to change votes. Int."
}
```

**GET /api/review/:review_id/comments**

Returns an array of comments for the given review id. Comments are sorted with newest given first.

**POST /api/reviews/:review_id/comments**

Adds a new comment to a review.

***Accepted Body***
```json
{
    "username":"Username of the user leaving the comment.",
    "body":"The body of the comment.String."
}
```

### Comments

***Example Comment Object***
```json
{
    "body": "Commodo et non ut aute anim nisi occaecat ea veniam ut ad.",
    "votes": 18,
    "author": "jessjelly",
    "review_id": 7,
    "created_at": "2017-11-22T12:43:33.389Z",
    "comment_id": 1
}
```

**DELETE /api/comments/:comment_id**

Deletes the comment by the given id returing a status of 204.

**PATCH /api/comments/:comment_id**

Accepts an object containg the property of inc_count and increments the votes property of this comment by this ammount 
returning the updated comment object.

***Accepted Body***

```Json
{
    "inc_votes":"Amount to change votes by. Int."
}
```

### Users

***Example User Object***

```json
{
    "id": "o123",
    "username": "grumpy243",
    "name": "Steven",
    "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
}
```


**GET /api/users**

Returns an array of objects containing all users.


**GET /api/users/:username**

Returns the user with that username.

