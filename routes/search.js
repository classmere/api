'use_strict';

const express       = require('express');
const router        = express.Router();
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: process.env.ELASTIC_URL,
});

// GET: Search for a course
router.get('/courses/:q', function searchCourse(req, res) {
  client.search({
    index: 'classmere',
    type: 'Course',
    body: {
      query: {
        match: {
          description: req.params.q,
        },
      },
    },
  },
  (err, response) => {
    if (err) {
      console.error(err);
    } else if (response.hits.hits.length === 0) {
      res.status(404).json({ 'ohsh***': 'not found' });
    } else {
      const classmereResponse = response.hits.hits.map((hit) => {
        const course = hit._source;
        return {
          title: course.title,
          abbr: course.abbr,
          credits: course.credits,
          description: course.description,
          hitScore: hit._score,
        };
      });

      res.json(classmereResponse);
    }
  });
});

module.exports = router;
