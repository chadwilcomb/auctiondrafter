'use strict';
const Trade = require('../models/trade');
const LeagueOwner = require('../models/leagueOwner');

exports.index = function (req, res) {

  Trade
  .fetchAll({ withRelated: ['fromOwner', 'toOwner', 'tradeStatus', 'fromDraftpicks.player', 'toDraftpicks.player'] })
  .then(function (results) {
    res.json(results);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

exports.getById = function (req, res) {

  Trade
  .where({ id: req.params.id })
  .fetch({ withRelated: ['fromOwner', 'toOwner', 'tradeStatus', 'fromDraftpicks.player', 'toDraftpicks.player'] })
  .then(function (trade) {
    return res.json(trade);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

exports.getTradesForLeague = function (req, res) {

  const query = {
    where: { league_id: req.params.id }
  };
  if (!req.query.includeCancelled || req.query.includeCancelled.toLowerCase() !== 'true') {
    query.whereNot = { trade_status_id: 4 }
  }

  Trade
  .query(query)
  .fetchAll({ withRelated: ['fromOwner', 'toOwner', 'tradeStatus', 'fromDraftpicks.player', 'toDraftpicks.player'] })
  .then(function (results) {
    res.json(results);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

exports.getTradesForLeagueOwner = function (req, res) {

  Trade
  .query(function(qb) {
    qb
    .where({ league_id: req.params.league_id })
    .andWhere(function () {
      this.where({ to_owner_id: req.params.owner_id }).orWhere({ from_owner_id: req.params.owner_id })
    })
  })
  .fetchAll({ withRelated: ['fromOwner', 'toOwner', 'tradeStatus', 'fromDraftpicks.player', 'toDraftpicks.player'] })
  .then(function (draftpick) {
    res.json(draftpick);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });
};

// POST
exports.submitTrade = function (req, res) {

  Trade
  .forge({
    from_owner_id: req.body.from_owner_id,
    to_owner_id: req.body.to_owner_id,
    from_cash: req.body.from_cash,
    to_cash: req.body.to_cash,
    league_id: req.body.league_id,
    proposed: new Date()
  })
  .save()
  .then(function (trade) {
    trade.fromDraftpicks().attach(req.body.from_draftpicks);
    trade.toDraftpicks().attach(req.body.to_draftpicks);
    res.json(trade);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

//PUT
exports.update = function (req, res) {

  // TODO: Only allow update of trade_status_id unless user is Admin
  const tradeStatus = parseInt(req.body.trade_status_id);

  Trade.forge({ id: req.params.id })
  .fetch({ withRelated: ['fromDraftpicks', 'toDraftpicks'], require: true })
  .then(function (trade) {
    const previousTradeStatus = trade.get('trade_status_id');
    const update = {
      // from_owner_id: req.body.from_owner_id || trade.get('from_owner_id'),
      // to_owner_id: req.body.to_owner_id || trade.get('to_owner_id'),
      // from_cash: req.body.from_cash || trade.get('from_cash'),
      // to_cash: req.body.to_cash || trade.get('to_cash'),
      // league_id: req.body.league_id || trade.get('league_id'),
      trade_status_id: tradeStatus || trade.get('trade_status_id'),
    };
    switch (tradeStatus) {
      case 1: //Proposed
        update.proposed = new Date()
        break;
      case 2: //Accepted
        update.accepted = new Date()
        break;
      case 3: //Rejected
        update.rejected = new Date()
        break;
      case 4: //Cancelled
        update.cancelled = new Date()
        break;
      case 5: //Processed
        break;
      default:

    }
    trade.save(update, { patch: true })
    .then(function (trade) {
      if (trade.get('trade_status_id') !== previousTradeStatus && trade.get('trade_status_id') === 2) {

        // if trade accepted, update draftpicks, league_owner/roster draft_budget/bid_balance
        trade.related('fromDraftpicks').forEach(function (draftpick) {
          draftpick.save({ current_owner_id: trade.get('to_owner_id') });
        });
        trade.related('toDraftpicks').forEach(function (draftpick) {
          draftpick.save({ current_owner_id: trade.get('from_owner_id') });
        });
        if (trade.get('from_cash') > 0 || trade.get('to_cash') > 0) {
          LeagueOwner.forge({ league_id: trade.get('league_id'), owner_id: trade.get('from_owner_id') })
          .fetch({ require: true })
          .then(function (leagueOwner) {
            const budget = leagueOwner.get('draft_budget') - trade.get('from_cash') + trade.get('to_cash');
            leagueOwner.save({ draft_budget: budget })
          });
          LeagueOwner.forge({ league_id: trade.get('league_id'), owner_id: trade.get('to_owner_id') })
          .fetch({ require: true })
          .then(function (leagueOwner) {
            const budget = leagueOwner.get('draft_budget') + trade.get('from_cash') - trade.get('to_cash');
            leagueOwner.save({ draft_budget: budget })
          });
        }
      }
      res.json(trade);
    })
    .catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};
