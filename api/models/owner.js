'use strict';
const Bookshelf = require('../bookshelf');
const bcrypt = require('bcrypt');
const saltRounds = 10;

require('./league');
require('./leagueOwner');

const Owner = Bookshelf.Model.extend({
  tableName: 'owner',

  leagues () {
    return this.belongsToMany('League').through('LeagueOwner');
  },

  initialize: function() {
    this.on('creating', this.hashPassword, this);
  },

  hashPassword: function() {
    // return Promise.promisify(bcrypt.getSalt)(this.get('password')).bind(this).then(function(hash) {
    //   this.set('password', hash);
    // });
    return bcrypt.hash(this.get('password'), saltRounds, function(err, hash) {
      // Store hash in your password DB.
      this.set('password', hash);
    });
  },

  // verify the password
  verifyPassword (password, cb) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      console.log(hash);
    });
    bcrypt.compare(password, this.get('password'), function(err, res) {
      if (err) {
        console.log(JSON.stringify(err));
        return cb(err);
      }
      if (res) {
        console.log('password matches');
        return cb(null, true);
      } else {
        console.log('password does not match');
        return cb('Not Authorized');
      }
    });
  }

});


module.exports = Bookshelf.model('Owner', Owner);
