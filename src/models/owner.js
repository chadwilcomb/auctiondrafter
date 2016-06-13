'use strict';
const Bookshelf = require('../bookshelf');
require('./league');
require('./leagueOwner');

const Owner = Bookshelf.Model.extend({
  tableName: 'owner',
  leagues () {
    return this.belongsToMany('League').through('LeagueOwner');
  }
});

module.exports = Bookshelf.model('Owner', Owner);
