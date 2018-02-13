/* eslint-env jest */

const util = require('util')
const exec = util.promisify(require('child_process').exec)
const request = require('supertest')
let app

// start a mongo instance loaded with test data using docker
beforeAll(async () => {
  await exec('docker run --name scraper_test_db -d --rm -p 27017:27017 mongo')
  await exec('docker cp __tests__/dump/ scraper_test_db:/dump')
  await exec('docker exec scraper_test_db mongorestore /dump')
  app = require('../app')
  await twoSeconds()
})

afterAll(done => exec('docker kill scraper_test_db', done))

describe('courses endpoint', () => {
  test('/courses succeeds', async () => {
    const response = await request(app).get('/courses')
    expect(response.type).toBe('application/json')
    expect(response.statusCode).toBe(200)
  })

  test('/courses returns an Array', async () => {
    const response = await request(app).get('/courses')
    expect(Array.isArray(response.body)).toBeTruthy()
  })
})

function twoSeconds () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
