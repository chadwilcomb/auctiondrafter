'use strict';
const Bookshelf = require('../bookshelf');
require('./owner');
require('./player');
require('./owner');

const Draftpick = Bookshelf.Model.extend({
  tableName: 'draftpick',
  roster () {
    return this.belongsTo('Roster');
  },
  player () {
    return this.belongsTo('Player');
  },
  draftedOwner () {
    return this.belongsTo('Owner', 'drafted_owner_id');
  },
  currentOwner () {
    return this.belongsTo('Owner', 'current_owner_id');
  }
});

module.exports = Bookshelf.model('Draftpick', Draftpick);
