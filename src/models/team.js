'use strict';
const Bookshelf = require('../bookshelf');
require('./player');

const Team = Bookshelf.Model.extend({
  tableName: 'team',
  idAttribute: 'id',
  players () {
    return this.hasMany('Player');
  }
});

module.exports = Bookshelf.model('Team', Team);
