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
})  
describe('GET/api/reviews', () => {
    it('should return an array of review objects', () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
            .then((results) => {
                let data = results.body.reviews;
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