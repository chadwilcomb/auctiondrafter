'use strict';
const Player = require('../models/player')
const Team = require('../models/team')

exports.index = function (req, res) {

  let query = { where: { active: true } };
  if (req.query.includeInactives === 'true') query = {};

  Player
  .query(query)
  .fetchAll({ withRelated: ['team'] })
  .then(function (results) {
    res.json(results);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message }
);
  });

};


exports.getById = function (req, res) {

  Player
  .where({ id: req.params.id })
  .fetch({ withRelated: ['team'] })
  .then(function (player) {
    return res.json(player);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};


exports.autocomplete = function (req, res) {

  const term = req.params.term.trim().toLowerCase() + '%';

  Player
  .query(function(qb) {
    qb.where('first_name', 'ILIKE', term).orWhere('last_name', 'ILIKE', term);
  })
  .fetchAll({ withRelated: ['team'] })
  .then(function (players) {
    return res.json(players);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

//POST
exports.create = function (req, res) {
  Player
  .forge({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    position: req.body.position,
    team_id: req.body.team_id,
    active: req.body.active || true,
  })
  .save()
  .then(function (player) {
    res.json(player);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });
};

//PUT
exports.update = function (req, res) {

  Player.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(function (player) {
    player.save({
      first_name: req.body.first_name || player.get('first_name'),
      last_name: req.body.last_name || player.get('last_name'),
      position: req.body.position || player.get('position'),
      team_id: req.body.team_id || player.get('team_id'),
      active: req.body.active || player.get('active'),
    })
    .then(function (player) {
      res.json(player);
    })
    .catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

//DELETE
exports.deactivate = function (req, res) {

  Player.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(function (player) {
    player.save({
      active: false,
    })
    .then(function (player) {
      res.json(player);
    })
    .catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};
