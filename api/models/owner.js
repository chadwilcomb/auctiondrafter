'use strict';
const Bookshelf = require('../bookshelf');
require('./league');
require('./leagueOwner');

const Owner = Bookshelf.Model.extend({
  tableName: 'owner',
  leagues () {
    return this.belongsToMany('League').through('LeagueOwner');
  },
  // verify the password
  verifyPassword (password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  }

  // verifyPassword (password, hash, done) {
  //   // Load hash from your password DB.
  //   bcrypt.compare(password, hash.replace('$2y$', '$2a$'), function(err, result) {
  //     return done(err, result);
  //   });
  // }
});

module.exports = Bookshelf.model('Owner', Owner);
