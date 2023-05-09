const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed')
const request = require('supertest')
const app = require('../db/app')
const connection = require('../db/connection');
const { string } = require('pg-format');
const Endpoint = require('../endpoints.json')

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
                .then(data => expect(JSON.parse(data.body.endpoint)).toEqual(Endpoint))
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