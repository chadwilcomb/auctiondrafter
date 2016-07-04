'use strict';
const Draft = require('../models/draft')

exports.index = function (req, res) {

  let query = { where: { active: true } };
  if (req.query.includeInactives === 'true') query = {};

  Draft
  .query(query)
  .fetchAll({ withRelated: ['league', 'rosters'] })
  .then(function (results) {
    res.json(results);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

exports.getById = function (req, res) {

  Draft
  .where({ id: req.params.id })
  .fetch({ withRelated: ['league', 'rosters.owner', 'rosters.draftpicks.player'] })
  .then(function (draft) {
    return res.json(draft);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

//POST
exports.create = function (req, res) {

  Draft
  .forge({
    league_id: req.body.league_id,
    draft_date: req.body.draft_date,
    year: req.body.year,
    location: req.body.location,
    draft_type_id: req.body.active || 1,
    team_budget: req.body.team_budget || 200,
    slots: req.body.slots || 16
  })
  .save()
  .then(function (draft) {
    // create new roster for each owner_id in league
    const league = draft.related('league');
    const owners = league.related('owners');

    res.json(draft);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });
};

//PUT
exports.update = function (req, res) {

  Draft.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(function (draft) {
    draft.save({
      league_id: req.body.league_id || draft.get('league_id'),
      draft_date: req.body.draft_date || draft.get('draft_date'),
      year: req.body.year || draft.get('year'),
      location: req.body.location || draft.get('location'),
      draft_type_id: req.body.active || draft.get('draft_type_id'),
      team_budget: req.body.team_budget || draft.get('team_budget'),
      slots: req.body.slots || draft.get('slots')
    })
    .then(function (draft) {
      res.json(draft);
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

  Draft.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(function (draft) {
    draft.save({
      active: false,
    })
    .then(function (draft) {
      res.json(draft);
    })
    .catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};
