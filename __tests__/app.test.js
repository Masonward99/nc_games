const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed')
const request = require('supertest')
const app = require('../db/app')
const connection = require('../db/connection')
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
                expect(res.body.categories[0]).toHaveProperty('slug')
                expect(res.body.categories[0]).toHaveProperty("description")
            })
    })
})