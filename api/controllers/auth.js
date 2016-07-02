// Load required packages
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const Owner = require('../models/owner');

passport.use(new BasicStrategy(function(username, password, callback) {
  Owner
    .forge({ username: username })
    .fetch()
    .then(function (owner) {
      // No owner found with that username
      if (!owner) {
        console.log('no owner found');
        return callback(null, false);
      }

      // Make sure the password is correct
      owner.verifyPassword(password, function(err, isMatch) {
        if (err) {
          console.log('error verifying password');
          return callback(err);
        }
        // Password did not match
        if (!isMatch) {
          console.log('password did not match');
          return callback(null, false);
        }
        // Success
        console.log('authenticated');
        return callback(null, owner);
      });
    })
    .catch(function (err) {
      return callback(err);
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
