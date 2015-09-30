const thinky = require('./database');
const type = thinky.type;
const bcrypt = require('bcrypt');

const User = thinky.createModel('User', {
  id: type.string(),
  email: type.string().required().email(),
  name: type.string().required(),
  password: type.string().required(),
  avatarURL: type.string(),
  createdAt: type.date().default(Date.now()),
  updatedAt: type.date().default(Date.now()),
});

// Methods
User.defineStatic('getView', function userView() {
  return this.without('password');
});

User.define('passwordsMatch', function passwordsMatch(password, callback) {
  bcrypt.compare(password, this.password, function bcryptComp(err, res) {
    callback(err, res);
  });
});

// Hooks
User.pre('save', function hashPassword(next) {
  const self = this;
  bcrypt.hash(this.password, 8, (err, hash) => {
    self.password = hash;
    next();
  });
});

module.exports = User;

const Section = require('./Section');
User.hasAndBelongsToMany(Section, 'sections', 'id', 'id');
User.hasAndBelongsToMany(Section, 'sectionWishList', 'id', 'id');
