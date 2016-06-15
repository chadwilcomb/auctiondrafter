'use strict';
const Team = require('../models/team')

exports.index = function (req, res) {

  let query = { where: { active: true } };
  if (req.query.includeInactives === 'true') query = {};

  const fetchOptions = { withRelated: [] };
  if (req.query.includePlayers) fetchOptions.withRelated.push('players');

  Team
  .query(query)
  .fetchAll(fetchOptions)
  .then(function (results) {
    res.json(results);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

exports.byAbbr = function (req, res) {

  Team
  .where({ abbr: req.params.abbr })
  .fetch({ withRelated: ['players'] })
  .then(function (results) {
    res.json(results);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

//POST
exports.create = function (req, res) {

  Team
  .forge({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    position: req.body.position,
    team_id: req.body.team_id,
    active: req.body.active || true,
  })
  .save()
  .then(function (team) {
    res.json(team);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });
};

//PUT
exports.update = function (req, res) {

  Team.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(function (team) {
    team.save({
      name: req.body.name || team.get('name'),
      abbr: req.body.abbr || team.get('abbr'),
      bye: req.body.position || team.get('bye'),
      logo_path: req.body.logo_path || team.get('logo_path'),
      wordmark_path: req.body.wordmark_path || team.get('wordmark_path')
    })
    .then(function (team) {
      res.json(team);
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

  Team.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(function (team) {
    team.save({
      active: false,
    })
    .then(function (team) {
      res.json(team);
    })
    .catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};
