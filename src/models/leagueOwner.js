'use strict'
const Bookshelf = require('../bookshelf');

const LeagueOwner = Bookshelf.Model.extend({
  tableName: 'league_owner'
});

module.exports = Bookshelf.model('LeagueOwner', LeagueOwner);
