'use strict';
const Bookshelf = require('../bookshelf');
require('./league');

const Owner = Bookshelf.Model.extend({
  tableName: 'owner',
  leagues () {
    return this.belongsToMany('League');
  }
});

module.exports = Bookshelf.model('Owner', Owner);
