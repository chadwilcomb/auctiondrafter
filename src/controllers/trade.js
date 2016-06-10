'use strict';
const Trade = require('../models/trade')

exports.index = function (req, res) {

  Trade
  // .query({})
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

  let query = {
    where: { league_id: req.params.id },
    whereNot: { trade_status_id: 4 }
  };
  if (req.query.includeCancelled && req.query.includeCancelled.toLowerCase() === 'true') {
    delete query.whereNot;
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

exports.submitTrade = function (req, res) {

  Trade
  .forge({
    from_owner_id: req.body.from_owner_id,
    to_owner_id: req.body.to_owner_id,
    from_cash: req.body.from_cash,
    to_cash: req.body.to_cash,
    league_id: req.body.league_id,
    proposed: new Date(),
    // trade_status_id: 1 //Proposed
    // from_draftpicks: req.body.from_draftpicks,
    // to_draftpicks: req.body.to_draftpicks,
  })
  .save()
  .then(function (trade) {
    console.log('trade id: ' + trade.get('id'));
    console.log(req.body.from_draftpicks);
    trade.fromDraftpicks().attach(req.body.from_draftpicks);
    trade.toDraftpicks().attach(req.body.to_draftpicks);
    res.json(trade);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};
