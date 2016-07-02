'use strict'
const Bookshelf = require('../bookshelf');
require('./owner');
require('./leagueOwner');

const League = Bookshelf.Model.extend({
  tableName: 'league',
  owners () {
    return this.belongsToMany('Owner').through('LeagueOwner');
  },
  drafts () {
    return this.hasMany('Draft')
  }
});

module.exports = Bookshelf.model('League', League);
