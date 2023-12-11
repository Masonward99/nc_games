const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed')
const request = require('supertest')
const app = require('../db/app')
const connection = require('../db/connection');
const { string } = require('pg-format');
const endpoint = require('../endpoints.json')
const sorted = require('jest-sorted')

beforeEach(() => seed(testData))
afterAll(() => connection.end())

describe('GET/api/categories', () => {
    it('returns an array of the correct length', () => {
        return request(app)
            .get('/api/categories')
            .expect(200)
            .then(res => expect(res.body.categories.length).toBe(4))
    })
    it('each categories object has correct keys', () => {
        return request(app)
            .get('/api/categories')
            .expect(200)
            .then(res => {
                let arr = res.body.categories
                arr.every((end) =>
                    expect(end).toEqual(expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String),
                    })))
            })
    })
})
    describe('GET/api', () => {
        it('returns an object containing information on the endpoints', ()=> {
            return request(app)
                .get('/api')
                .expect(200)
                .then(data => expect(data.body).toEqual(endpoint))
            })
    })
describe('Get/api/reviews/:review_id', () => {
    it('returns one review object', () => {
        return request(app)
            .get("/api/reviews/1")
            .expect(200)
            .then((data) => {
                let result = data.body.review
                expect(result['review_id']).toBe(1)
                expect(result).toEqual(expect.objectContaining({
                    owner: expect.any(String),
                    title: expect.any(String),
                    review_id: expect.any(Number),
                    category: expect.any(String),
                    votes: expect.any(Number),
                    review_img_url: expect.any(String),
                    created_at: expect.any(String),
                    designer: expect.any(String),
                    comment_count:expect.any(String)
                }))
            })
    })
        
    it('returns 404 when there are no reviews with that id', () => {
        return request(app)
            .get('/api/reviews/44')
            .expect(404)
            .then(res => expect(res.body.msg).toBe('no review found with id 44'))
    })
    it('returns 400 when give a bad input', () => {
        return request(app)
            .get('/api/reviews/cat')
            .expect(400)
            .then(res => expect(res.body.msg).toBe('bad request'))
    })
    describe('POST/api/reviews/:review_id/comments', () => {
        it('returns the posted comment', () => {
            return request(app)
                .post("/api/reviews/1/comments")
                .send({ username: 'mallionaire', body: 'great game' } )
                .expect(201)
                .then(result => {
                    const comment = result.body.comment
                    expect(comment).toEqual(expect.objectContaining({
                        body: expect.any(String),
                        author: expect.any(String),
                        review_id: expect.any(Number),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        comment_id: 7
                    }))           
                })
        })
    })
    it('gets an 400 error when no data is sent', () => {
        return request(app)
            .post('/api/reviews/1/comments')
            .send({})
            .expect(400)
        .then(res => expect(res.body.msg).toBe('bad request'))
    })
    it('get an 404 error when username is valid but not found', () => {
        return request(app)
            .post('/api/reviews/1/comments')
            .send({ username: 'god', body: 'I like this' })
            .expect(404)
            .then(res => expect(res.body.msg).toBe('Resource not found'))
    })
    it("get an 400 error when missing data", () => {
      return request(app)
        .post("/api/reviews/1/comments")
        .send({body: "I like this" })
        .expect(400)
        .then((res) => expect(res.body.msg).toBe("bad request"));
    });
    it('gets a 400 error when review id is invalid', () => {
        return request(app)
          .post("/api/reviews/cat/comments")
          .send({ username: "mallionaire", body: "I like this" })
          .expect(400)
          .then((res) => expect(res.body.msg).toBe("bad request"));
    })

    it("gets an 404 error when review doesnt exist", () => {
      return request(app)
        .post("/api/reviews/44/comments")
        .send({ username: "mallionaire", body: "I like this" })
        .expect(404)
        .then((res) => expect(res.body.msg).toBe("Resource not found"));
    });
})  


describe('get/api/reviews/:review_id/comments', () => {
    it('returns an array of comments', () => {
        return request(app)
            .get('/api/reviews/2/comments')
            .expect(200)
            .then(res => {
                let resultsArr = res.body.comments
                resultsArr.forEach(comment => {
                    expect(comment).toHaveProperty('comment_id')
                    expect(comment).toHaveProperty("votes");
                    expect(comment).toHaveProperty("created_at");
                    expect(comment).toHaveProperty("author");
                    expect(comment).toHaveProperty("body");
                    expect(comment).toHaveProperty("review_id");
                });
            })
    })
    it('arr is sorted by most recent comments', () => {
        return request(app)
            .get('/api/reviews/2/comments')
            .expect(200)
            .then(res => expect(res.body.comments).toBeSortedBy('created_at', {descending: true}))
    })
    it('returns a 404 error when passed a id that doesnt exist', () => {
        return request(app)
            .get('/api/reviews/44/comments')
            .expect(404)
        .then(response => expect(response.body.msg).toBe('Resource not found'))
    })
    it('returns a 400 error when given a bad input', () => {
        return request(app)
            .get('/api/reviews/cat/comments')
            .expect(400)
            .then(res => expect(res.body.msg).toBe('bad request'))
    })
    it('returns a 200 when passed given an input that returns an empty arr', () => {
        return request(app)
            .get('/api/reviews/1/comments')
            .expect(200)
            .then()
    })
})

describe('GET/api/reviews', () => {
    it('should return an array of review objects', () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
            .then((results) => {
                let data = results.body.reviews;
                expect(data.length).toBe(13)
                data.forEach(result => {
                    expect(result).toEqual(expect.objectContaining({
                        owner: expect.any(String),
                        title: expect.any(String),
                        review_id: expect.any(Number),
                        category: expect.any(String),
                        votes: expect.any(Number),
                        review_img_url: expect.any(String),
                        created_at: expect.any(String),
                        comment_count: expect.any(String),
                        designer: expect.any(String)
                    }))
                })
          });
    })
    it('does not have review_body property', () => {
        return request(app)
            .get('/api/reviews')
            .expect(200)
            .then((results) => {
                let data = results.body.reviews;
                data.forEach(result => {
                    expect(result).not.toHaveProperty('review_body')
                })
            })
    })
    it('is sorted by time descending', () => {
        return request(app)
            .get('/api/reviews')
            .expect(200)
            .then(result => expect(result.body.reviews).toBeSortedBy('created_at', { descending: true }))
    })
    it('can return a specific category', () => {
        return request(app)
            .get('/api/reviews?category=euro+game')
            .expect(200)
            .then(({ body }) => {
                body.reviews.forEach(review => expect(review.category).toBe('euro game'))
            })
    })
    it('can sort by comment_count', () => {
        return request(app)
            .get('/api/reviews?sort_by=comment_count')
            .expect(200)
            .then(data=> expect(data.body.reviews).toBeSortedBy('comment_count', {descending:true}) )
    })
    it('can sort by ascending', () => {
        return request(app)
            .get('/api/reviews?sort_by=comment_count&&order=asc')
            .expect(200)
        .then(({body})=> expect(body.reviews).toBeSortedBy('comment_count',{descending:false}))
    })
    it('returns a 400 error when passed an invalid order', () => {
        return request(app)
            .get('/api/reviews?order=hi')
            .expect(400)
    })
    it('returns a 404 error when passed a category that doesnt exist', () => {
        return request(app)
            .get('/api/reviews?category=yes')
            .expect(404)
    })
    it('returns a 400 error when passed an invalid sort condition', () => {
        return request(app)
            .get('/api/reviews?sort_by=fraud')
        .expect(400)
    })

    describe('DELETE/api/comments/:comment_id', () => {
        it('can remove a comment with id that exists', ()=> {
            return request(app)
                .delete('/api/comments/2')
                .expect(204)
                .then(()=>connection.query('SELECT * FROM comments WHERE comment_id = 2'))
                .then(res => expect(res.rows[0]).toEqual(undefined))
        })
    })
    it('gets a 404 error when passed a comment_id that doesnt exists', () => {
        return request(app)
            .delete('/api/comments/40')
            .expect(404)
        .then(res=> expect(res.body.msg).toBe('Resource not found'))
    })
    it('gets a 400 error when passed a comment_id that is not valid', () => {
        return request(app)
            .delete('/api/comments/cat')
            .expect(400)
        .then(res=>expect(res.body.msg).toBe('bad request'))
    })
})
describe('patch/api/reviews/:review_id', () => {
    it('returns the updated review', () => {
        return request(app)
            .patch('/api/reviews/1')
            .send({ inc_votes: 25 })
            .expect(200)
            .then(res => {
                let review = res.body.review;
                expect(review).toEqual(expect.objectContaining({
                    votes: 26,
                    review_id: 1,
                    created_at: expect.any(String),
                    title: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url: expect.any(String),
                    category:expect.any(String)
                }))
            })
    })
    it('returns 404 when review_id doesnt exist', () => {
        return request(app)
          .patch("/api/reviews/100")
          .send({ inc_votes: 25 })
            .expect(404)
        .then(res => expect(res.body.msg).toBe('Resource not found'))
    })
    it('returns a 400 when object is in wrong format', () => {
        return request(app)
          .patch("/api/reviews/1")
          .send({ votes: 25 })
          .expect(400)
          .then((res) => expect(res.body.msg).toBe("bad request"))
    })
    it('can accept negative review numbers', () => {
         return request(app)
           .patch("/api/reviews/1")
           .send({ inc_votes: -1 })
           .expect(200)
           .then((res) => {
             let review = res.body.review;
             expect(review).toEqual(
               expect.objectContaining({
                 votes: 0,
                 review_id: 1,
                 created_at: expect.any(String),
                 title: expect.any(String),
                 designer: expect.any(String),
                 owner: expect.any(String),
                 review_img_url: expect.any(String),
                 category: expect.any(String),
               })
             );
           })
    })
    it('gets 400 error when passed a invalid id', () => {
         return request(app)
           .patch("/api/reviews/bannana")
           .send({ inc_votes: 25 })
           .expect(400)
           .then((res) => expect(res.body.msg).toBe("bad request"));
    })
})
describe('get users', () => {
    it('returns an array of user objects', () => {
        return request(app)
            .get('/api/users')
            .expect(200)
            .then(result => {
                const users = result.body.users;
                expect(users.length).toBe(4)
                users.forEach(user => expect(user).toEqual(expect.objectContaining({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url:expect.any(String)
                })))

        })
    })
})
describe('error handling', () => {
    it('gets 404 when passed an invalid endpoint', () => {
        return request(app)
            .get('/api/cat')
            .expect(404)
            .then(response => expect(response.body.msg).toBe('Endpoint not found!'))
    })
})

describe('post/users/:username', () => {
    it('returns a the created user', () => {
        return request(app)
            .post('/api/users/theo')
            .send({ name: 'mason', avatar_url: 1, id:40 })
            .expect(201)
            .then((response)=>expect(response.body.user).toEqual({username:'theo', name:'mason', avatar_url:'1', id:'40'}))
    })
    it('returns a 400 error when missing a name', () => {
        return request(app)
          .post("/api/users/theo")
          .send({ avatar_url:'1' })
          .expect(400)
          .then()
    })
    it('returns a 400 error when username is already in use', () => {
        return request(app)
            .post('/api/users/bainesface')
            .send({ name: 'hello', avatar_url: '1' })
            .expect(400)
            .then()
    })
})
describe('patch/api/comments/:comment_id', () => {
    it('returns the updated comments', ()=> {
        return request(app)
            .patch('/api/comments/1')
            .send({ inc_votes: 1 })
            .expect(200)
            .then(res => {
                expect(res.body.comment).toEqual({
                  comment_id: 1,
                  body: "I loved this game too!",
                  votes: 17,
                  author: "bainesface",
                  review_id: 2,
                  created_at: "2017-11-22T12:43:33.389Z",
                });
            })
        
    })
    it('returns a 404 error when comment_id does not exist', () => {
        return request(app)
            .patch('/api/comments/900')
            .send({inc_votes:1})
         .expect(404)
    })
    it('return a 400 error when body is empty', () => {
        return request(app)
            .patch('/api/comments/1')
            .send()
            .expect(400)
    })
    it('returns a 400 error when incCount is not a number', () => {
        return request(app)
            .patch('/api/comments/1')
            .send({ inc_votes: 'potato' })
            .expect(400)
    })
    it('returns a 400 error when passed an invalid comment id', () => {
        return request(app)
            .patch('/api/comments/dog')
            .send({ inc_votes: 2 })
            .expect(400)
    })
    it('can increment votes by more than 1', () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: 25 })
          .expect(200)
          .then((res) => {
            expect(res.body.comment).toEqual({
              comment_id: 1,
              body: "I loved this game too!",
              votes: 41,
              author: "bainesface",
              review_id: 2,
              created_at: "2017-11-22T12:43:33.389Z",
            });
          });
    })
    it('can accept negative numbers', () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: -25 })
          .expect(200)
          .then((res) => {
            expect(res.body.comment).toEqual({
              comment_id: 1,
              body: "I loved this game too!",
              votes: -9,
              author: "bainesface",
              review_id: 2,
              created_at: "2017-11-22T12:43:33.389Z",
            });
          });
        
    })
})
describe('post /api/reviews', () => {
    it('returns the correct object', () => {
        return request(app)
          .post("/api/reviews")
          .send({
            title: "Culture a Love of Agriculture With Agricola",
            designer: "Uwe Rosenberg",
            owner: "bainesface",
            review_img_url:
              "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
            review_body:
              "You could sum up Agricola with the simple phrase 'Farmyard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
            category: "dexterity",
          })
          .expect(200)
          .then((data) =>
            expect(data.body.review).toEqual({
              review_id: 14,
              comment_count: "0",
              owner: "bainesface",
              title: "Culture a Love of Agriculture With Agricola",
              category: "dexterity",
              review_img_url:
                "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
              created_at: expect.any(String),
              votes: 0,
              designer: "Uwe Rosenberg",
              review_body:
                "You could sum up Agricola with the simple phrase 'Farmyard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
            })
          );
    })
    it('gets a 400 error when owner doesnt exist', () => {
        return request(app)
            .post('/api/reviews')
            .send({
          title: "Culture a Love of Agriculture With Agricola",
          designer: "Uwe Rosenberg",
          owner: "mason",
          review_img_url:
            "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
          review_body:
            "You could sum up Agricola with the simple phrase 'Farmyard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
          category: "dexterity",
            });  
    })
    it('gets a 404 error when category does not exist', () => {
        return request(app).post("/api/reviews").send({
          title: "Culture a Love of Agriculture With Agricola",
          designer: "Uwe Rosenberg",
          owner: "bainesface",
          review_img_url:
            "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
          review_body:
            "You could sum up Agricola with the simple phrase 'Farmyard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
          category: "trial",
        })
        .expect(404)
    })
    it('gets a 400 error when something is missing from body', () => {
        return request(app)
            .post("/api/reviews")
            .send({
             designer: "Uwe Rosenberg",
             owner: "bainesface",
             review_img_url:
               "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
             review_body:
               "You could sum up Agricola with the simple phrase 'Farmyard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
             category: "dexterity",
            })
        .expect(400)
    })
})
describe('post/api/categories', () => {
    it('can return the category', () => {
        return request(app)
          .post("/api/categories")
            .send({ slug: "a game", description: "this is a category" })
            .expect(201)
          .then((data) =>
            expect(data.body.category).toEqual({
              slug: "a game",
              description: "this is a category",
            })
          );
    })
    it('gets a 400 error when slug already exists', ()=>{
         return request(app)
          .post("/api/categories")
            .send({ slug: "euro game", description: "this is a category" })
            .expect(400)
         
    })
    it('gets a 400 error when no description is provided', () => {
         return request(app)
           .post("/api/categories")
           .send({ slug: "a game",  })
           .expect(400);
    })
    it('returns a 400 errors when no slug is provided', () => {
        return request(app)
            .post('/api/categories')
            .send({ description: 'hello' })
            .expect(400)
    })
})
describe('GET/ api/users/:username', () => {
    it('Returns a 200 with the user object', () => {
        return request(app).get(`/api/users/mallionaire`).expect(200)
            .then((data) => expect(data.body.user).toEqual({
                username: 'mallionaire',
                avatar_url: "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                id: null,
                name: "haz",
        }))
    })
    it('returns a 404 error when user does not exist', () => {
        return request(app).get(`/api/users/mason`).expect(404)
    })
    
})
describe('Get/api/users/:username/reviews', () => {
    it('Returns a 200 with all the users reviews', () => {
        return request(app)
          .get(`/api/users/philippaclaire9/reviews`)
          .expect(200)
          .then((data) =>
            expect(data.body.reviews).toEqual([
              {
                review_id: 2,
                title: "Jenga",
                category: "dexterity",
                designer: "Leslie Scott",
                owner: "philippaclaire9",
                review_body: "Fiddly fun for all the family",
                review_img_url:
                  "https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700",
                created_at: "2021-01-18T10:01:41.251Z",
                votes: 5,
              },
            ])
          );
    })
})
describe('Get/api/users/:username/comments', () => {
    it('returns a 200 with the reviews by that user', () => {
       return request(app)
         .get(`/api/users/philippaclaire9/comments`)
         .expect(200)
         .then((data) =>
           expect(data.body.comments).toEqual([
             {
               comment_id: 3,
               body: "I didn't know dogs could play games",
               review_id: 3,
               author: "philippaclaire9",
               votes: 10,
               created_at: "2021-01-18T10:09:48.110Z",
             },
             {
               comment_id: 6,
               body: "Not sure about dogs, but my cat likes to get involved with board games, the boxes are their particular favourite",
               review_id: 3,
               author: "philippaclaire9",
               votes: 10,
               created_at: "2021-03-27T19:49:48.110Z",
             },
           ])
         ); 
    })
})
describe('Get/api/users/id/:id', () => {
    it('returns the user with the id specified', ()=> {
        return request(app)
          .get(`/api/users/id/yes`)
          .expect(200)
          .then((data) =>
            expect(data.body.user).toEqual({
              username: "dav3rid",
              name: "dave",
              avatar_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              id: "yes",
            })
          );
    })
    describe('Delete/api/reviews/review_id', () => {
        it('returns a 204 if sucessful', () => {
            return request(app)
                .delete(`/api/reviews/1`)
                .expect(204)
        })
    })
    it('returns a 404 if no review found', () => {
        return request(app)
            .delete(`/api/reviews/400`)
            .expect(404)
    })
    it('returns a 400 error if review id is invalid', () => {
        return request(app)
            .delete(`/api/reviews/alpha`)
            .expect(400)
    })
    it('can delete reviews that have comments', () => {
        return request(app)
            .delete(`/api/reviews/2`)
            .expect(204)
    })
})