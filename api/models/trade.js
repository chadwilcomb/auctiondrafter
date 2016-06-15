'use strict';
const Bookshelf = require('../bookshelf');
require('./owner');
require('./league');
require('./draftpick');
require('./tradeStatus');

const Trade = Bookshelf.Model.extend({
  tableName: 'trade',
  league () {
    return this.belongsTo('League');
  },
  toOwner () {
    return this.belongsTo('Owner', 'to_owner_id');
  },
  fromOwner () {
    return this.belongsTo('Owner', 'from_owner_id');
  },
  tradeStatus () {
    return this.belongsTo('TradeStatus', 'trade_status_id')
  },
  fromDraftpicks () {
    return this.belongsToMany('Draftpick', 'trade_from_draftpick');
  },
  toDraftpicks () {
    return this.belongsToMany('Draftpick', 'trade_to_draftpick');
  }
});

module.exports = Bookshelf.model('Trade', Trade);
