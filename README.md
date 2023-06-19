# Northcoders House of Games API

This is my frontend project from the northcoders bootcamp. The project creates a database of board game reviews and the comments that users make on these reviews.
I used PSQL and express for this project.

#link to hosted version of the api

https://nc-games-83l3.onrender.com/api

#link to project trello board

https://trello.com/b/95fCAxfh/nc-games


#dependencies and creating .env files

This project uses node.Js v(18.14.2) and psql v(15.2)

#creating required .env files

This repo uses 2 .env files; one for testing and one for development
below are the names of the 2 files and the contents stored within them:

.env.test
PGDATABASE=nc_games_test

.env.development
PGDATABASE=nc_games

#list of availble endpoints

#categories

Get /api/categories

returns an array of objects which have these keys: slug, description

post /api/categories 

accepts a category object with a body of: slug, description and return this category object

#reviews

Get /api/reviews

return a review object with the following properties:
owner, title, review_id, category, review_img_url, created_at, votes, designer, comment_count

accepts these queries:
category => returns the reviews that are in the category choosen
sort_by => which can sort by any valid collumn (default of date)
order => allows the data to be sorted ascending or descending


post /api/reviews

accepts an object with these properties:
owner, title, review_body, designer, category (must be a category from category list), review_img_url (defaults if not provided)

and returns the created review with the aditional properties => review_id, votes, comment_count, created_at


get /api/reviews/:review_id

returns a review object with these properties:
review_id, title, review_body, designer, review_img_url, votes, category, owner, created_at, comment_count

patch /api/reviews/:review_id

accepts an object with the property of inc_votes and updates the votes of this review by that much returning the updated review object


get /api/review/:review_id/comments

returns an array of comments for the given review id
these comments contain these properties:
comment_id, votes, created_at, author, body, review_id
Most recent comment should be given first


Post /api/reviews/:review_id/comments

accepts a body with these properties:
username, body
and returns the posted comment

#comments

Delete /api/comments/:comment_id

delets the comment by the given id returing a status of 204

Patch /api/comments/:comment_id

accepts an object containg the property of inc_count and increments the votes property of this comment by this ammount 
returning the updated comment object

#Users

Get /api/users

returns an array of objects containing all users
the user object have these properties:
username, name, avatar_url


Get /api/users/:username

returns a user object with these properties:
username, name, avatar_url

