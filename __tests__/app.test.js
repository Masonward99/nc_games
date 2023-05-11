const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed')
const request = require('supertest')
const app = require('../db/app')
const connection = require('../db/connection');
const { string } = require('pg-format');
const endpoint = require('../endpoints.json')

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
            .then((result) => {
                expect(result.body.review['review_id']).toBe(1)
                expect(result.body.review).toHaveProperty("title")
                expect(result.body.review).toHaveProperty("review_body")
                expect(result.body.review).toHaveProperty("designer");
                expect(result.body.review).toHaveProperty("review_img_url");
                expect(result.body.review).toHaveProperty("votes");
                expect(result.body.review).toHaveProperty("category");
                expect(result.body.review).toHaveProperty("owner");
                expect(result.body.review).toHaveProperty("created_at");
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
                        comment_id: expect.any(Number)
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
    it('get an 400 error when username is not valid', () => {
        return request(app)
            .post('/api/reviews/1/comments')
            .send({ username: 'god', body: 'I like this' })
            .expect(400)
            .then(res => expect(res.body.msg).toBe('bad request'))
    })
    it("gets an 404 error when review doesnt exist", () => {
      return request(app)
        .post("/api/reviews/44/comments")
        .send({ username: "god", body: "I like this" })
        .expect(400)
        .then((res) => expect(res.body.msg).toBe("bad request"));
    });
})  
describe('error handling', () => {
    it('gets 404 when passed an invalid endpoint', () => {
        return request(app)
            .get('/api/cat')
            .expect(404)
            .then(response => expect(response.body.msg).toBe('Endpoint not found!'))
        .then() 
    })
})