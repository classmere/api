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

User.pre('save', function hashPassword(next) {
  const self = this;
  bcrypt.hash(this.password, 8, (err, hash) => {
    self.password = hash;
    next();
  });
});

module.exports = User;
