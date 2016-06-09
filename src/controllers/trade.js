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
