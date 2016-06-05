'use strict';
const Bookshelf = require('../bookshelf');
require('./owner');
require('./league');
require('./draft');
require('./draftpick');

const Roster = Bookshelf.Model.extend({
  tableName: 'roster',
  owner () {
    return this.belongsTo('Owner');
  },
  league () {
    return this.belongsTo('League');
  },
  draft () {
    return this.belongsTo('Draft');
  },
  draftpicks  () {
    return this.hasMany('Draftpick')
  }
});

module.exports = Bookshelf.model('Roster', Roster);
