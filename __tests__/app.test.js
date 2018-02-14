/* eslint-env jest */

const util = require('util')
const exec = util.promisify(require('child_process').exec)
const request = require('supertest')
const app = require('../app')

/// Clears the test database and loads sample data for testing, assuming there
/// is a MongoDB instance running at localhost or MONGO_URL.
beforeAll(async () => {
  const url = process.env.MONGO_URL || 'mongodb://localhost:27017/test'
  await exec(`mongorestore --uri=${url} --drop ./__tests__/dump`)
})

describe('/courses endpoint', () => {
  test('/courses succeeds', async () => {
    const response = await request(app).get('/courses')
    expect(response.type).toBe('application/json')
    expect(response.statusCode).toBe(200)
    console.log(response.body)
  })

  test('/courses returns an Array', async () => {
    const response = await request(app).get('/courses')
    expect(Array.isArray(response.body)).toBeTruthy()
  })
})

describe('/subjects endpoint', () => {
  test('/subjects succeeds', async () => {
    const response = await request(app).get('/subjects')
    expect(response.type).toBe('application/json')
    expect(response.statusCode).toBe(200)
  })

  test('/courses returns an Array', async () => {
    const response = await request(app).get('/subjects')
    expect(Array.isArray(response.body)).toBeTruthy()
  })
})
