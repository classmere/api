'use_strict';

const express  = require('express');
const router   = express.Router();

const User     = require('../schemas/User');

/**
 * POST a new user. Ensures schema is valid before attempting to save
 */
router.post('/', function postUser(req, res, next) {
  const user = new User({
    email: req.get('email'),
    name: req.get('name'),
    password: req.get('password'),
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
