'use_strict';

const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');

const User     = require('../schemas/User');

/**
 * GET a user.
 */
router.get('/:userId', function getUser(req, res, next) {
  User.get(req.params.userId)
  .getJoin()
  .then(function getUserResponse(user) {
    res.json(user);
  });
});

/**
 * POST login - request an authentication token.
 */
router.post('/login', function postLoginRequest(req, res, next) {
  const suppliedEmail = req.body.email;
  const suppliedPassword = req.body.password;

  // Don't go further if email and password aren't supplied
  if (suppliedEmail === undefined || suppliedPassword === undefined) {
    const err = new Error('Please supply a email and password');
    err.code = 400;
    next(err);
  }

  // verify password
  User.filter({
    email: suppliedEmail,
    password: suppliedPassword,
  })
  .run()
  .then(function checkIfUserIsValid(result) {
    console.log('cool');
    const user = result[0];
    res.json(result);
  });
});

/**
 * POST new user. Ensures schema is valid before attempting to save
 */
router.post('/', function postUser(req, res, next) {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  try {
    user.validate();
  } catch(err) {
    err.status = 400;
    next(err);
  }

  user.save()
  .then(function successCallback() {
    res.status(201)
    .json({ 'success': 'user created' });
  })
  .error(function errorCallback(err) {
    err.status = 500;
    next(err);
  });
});

module.exports = router;
