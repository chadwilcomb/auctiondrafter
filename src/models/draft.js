'use strict';
const Bookshelf = require('../bookshelf');
require('./league');
require('./roster');

const Draft = Bookshelf.Model.extend({
  tableName: 'draft',
  league () {
    return this.belongsTo('League');
  },
  rosters () {
    return this.hasMany('Roster')
  }
});

module.exports = Bookshelf.model('Draft', Draft);
