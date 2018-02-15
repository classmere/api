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

  let response = await request(app).get('/search/courses/music')
  while (response.status === 500) {
    await milliseconds(1000)
    response = await request(app).get('/search/courses/music')
  }
})

describe('/', () => {
  test('succeeds and returns json', async () => {
    const response = await request(app).get('/')
    expect(response.type).toBe('application/json')
    expect(response.statusCode).toBe(200)
  })

  test('returns a welcome message', async () => {
    const response = await request(app).get('/')
    expect(response.body.message).toBe('Welcome to the classmere api.')
  })
})

describe('/courses', () => {
  test('succeeds and returns json', async () => {
    const response = await request(app).get('/courses')
    expect(response.type).toBe('application/json')
    expect(response.statusCode).toBe(200)
  })

  test('returns an Array', async () => {
    const response = await request(app).get('/courses')
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeGreaterThan(100)
  })

  test('contains the correct keys', async () => {
    const response = await request(app).get('/courses')
    for (const course of response.body) {
      expect(Object.getOwnPropertyNames(course)).toEqual([
        'title',
        'subjectCode',
        'courseNumber'])
    }
  })
})

describe('/courses/<subject_code>/<course_number>', () => {
  test('succeeds and returns json', async () => {
    const response = await request(app).get('/courses/CS/161')
    expect(response.type).toBe('application/json')
    expect(response.statusCode).toBe(200)
  })

  test('doesn\'t contain _id, _version, or prereqs field', async () => {
    const response = await request(app).get('/courses/CS/161')
    expect(response.body).not.toHaveProperty('_id')
    expect(response.body).not.toHaveProperty('_version')
    expect(response.body).not.toHaveProperty('prereqs')
  })

  test('keys are the correct type', async () => {
    const response = await request(app).get('/courses/CS/161')
    expect(typeof response.body.title).toBe('string')
    expect(typeof response.body.subjectCode).toBe('string')
    expect(typeof response.body.courseNumber).toBe('number')
    expect(typeof response.body.credits).toBe('string')
    expect(typeof response.body.description).toBe('string')
  })

  test.skip('dates are valid ISO date strings', async () => {
    const response = await request(app).get('/courses/CS/161')
    expect(isISOString(response.body.updated)).toBeTruthy()
    for (const section of response.body.sections) {
      for (const meetingTime of section.meetingTimes) {
        expect(isISOString(meetingTime.startTime)).toBeTruthy()
        expect(isISOString(meetingTime.endTime)).toBeTruthy()
      }
    }
  })
})

describe('/subjects', () => {
  test('succeeds and returns json', async () => {
    const response = await request(app).get('/subjects')
    expect(response.type).toBe('application/json')
    expect(response.statusCode).toBe(200)
  })

  test('returns an Array', async () => {
    const response = await request(app).get('/subjects')
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeGreaterThan(0)
  })
})

describe('/search/buildings/<keyword>', () => {
  test('succeeds and returns json', async () => {
    const response = await request(app).get('/search/buildings/kelley')
    expect(response.type).toBe('application/json')
    expect(response.statusCode).toBe(200)
  })

  test('doesn\'t contain _id field', async () => {
    const response = await request(app).get('/search/buildings/kelley')
    expect(response.body).not.toHaveProperty('_id')
  })
})

describe('/search/courses/<keyword>', () => {
  test('succeeds and returns json', async () => {
    const response = await request(app).get('/search/courses/computer')
    expect(response.type).toBe('application/json')
    expect(response.statusCode).toBe(200)
  })

  test('doesn\'t contain _id, _version, or prereqs field', async () => {
    const response = await request(app).get('/search/courses/computer')
    expect(response.body).not.toHaveProperty('_id')
    expect(response.body).not.toHaveProperty('_version')
    expect(response.body).not.toHaveProperty('prereqs')
  })
})

function isISOString (dateString) {
  try {
    return new Date(dateString).toISOString() === dateString
  } catch (error) {
    return false
  }
}

function milliseconds (t) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}
