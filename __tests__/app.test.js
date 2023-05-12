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
                .then(data => expect(JSON.parse(data.body.endpoint)).toEqual(endpoint))
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
                    designer: expect.any(String)
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
describe('error handling', () => {
    it('gets 404 when passed an invalid endpoint', () => {
        return request(app)
            .get('/api/cat')
            .expect(404)
            .then(response => expect(response.body.msg).toBe('Endpoint not found!'))
    })
})