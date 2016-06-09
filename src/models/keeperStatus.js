'use strict';
const Bookshelf = require('../bookshelf');

const KeeperStatus = Bookshelf.Model.extend({
  tableName: 'l_keeper_status',
});

module.exports = Bookshelf.model('KeeperStatus', KeeperStatus);
