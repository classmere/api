/* eslint-env jest */

const fs = require('fs')
const request = require('supertest')
const MongoClient = require('mongodb').MongoClient
const app = require('../app')

/// Clears the test database and loads sample data for testing, assuming there
/// is a MongoDB instance running at localhost or MONGO_URL.
/// If you don't have MongoDB installed, this requirement can be done with docker:
/// $ docker run --rm -d -p 27017:27017 mongo
beforeAll(async () => {
  const url = process.env.MONGO_URL || 'mongodb://localhost:27017/test'
  const client = await MongoClient.connect(url)
  const db = client.db('test')

  for (const document of ['buildings']) {
    const jsonFile = fs.readFileSync(`./__tests__/newdump/${document}.json`)
    const jsonDocuments = JSON.parse(jsonFile)
                              .map(d => ({...d, _id: d._id.$oid}))
    await db.collection(document).deleteMany({})
    await db.collection(document).insertMany(jsonDocuments)
  }

  await client.close()
})

describe('/courses endpoint', () => {
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
