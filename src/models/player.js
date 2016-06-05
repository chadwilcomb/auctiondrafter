'use strict';
const Bookshelf = require('../bookshelf');
require('./team');

const Player = Bookshelf.Model.extend({
  tableName: 'player',
  team () {
    return this.belongsTo('Team');
  }
});

module.exports = Bookshelf.model('Player', Player);
