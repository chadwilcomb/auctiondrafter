'use strict'
const Bookshelf = require('../bookshelf');
require('./owner');

const League = Bookshelf.Model.extend({
  tableName: 'league',
  owners () {
    return this.belongsToMany('Owner');
  }
});

module.exports = Bookshelf.model('League', League);
