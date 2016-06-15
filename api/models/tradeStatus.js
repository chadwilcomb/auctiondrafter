'use strict';
const Bookshelf = require('../bookshelf');

const TradeStatus = Bookshelf.Model.extend({
  tableName: 'l_trade_status',
});

module.exports = Bookshelf.model('TradeStatus', TradeStatus);
