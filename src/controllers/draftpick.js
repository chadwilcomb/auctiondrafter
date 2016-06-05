const Draftpick = require('../models/draftpick')

exports.index = function (req, res) {

  Draftpick
  .fetchAll({ withRelated: ['currentOwner', 'player'] })
  .then(function (draftpick) {
    res.json(draftpick);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

exports.getById = function (req, res) {

  Draftpick
  .where({ id: req.params.id })
  .fetch({ withRelated: ['currentOwner', 'player'] })
  .then(function (draftpick) {
    return res.json(draftpick);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};


//POST
exports.create = function (req, res) {

  Draftpick
  .forge({
    roster_id: req.body.roster_id,
    league_id: req.body.league_id, //unnecessary column?
    player_id: req.body.player_id,
    bid: req.body.bid,
    drafted_owner_id: req.body.drafted_owner_id,
    current_owner_id: req.body.current_owner_id,
    drafted: req.body.drafted || new Date(),
    draft_id: req.body.draft_id,
    violation: req.body.violation,
    keeper_status_id: req.body.keeper_status_id || 0,
    keeper_year: req.body.keeper_year || 1
  })
  .save()
  .then(function (draftpick) {
    res.json(draftpick);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });
};

//PUT
exports.update = function (req, res) {

  Draftpick.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(function (draftpick) {
    draftpick.save({
      roster_id: req.body.roster_id || draftpick.get('roster_id'),
      league_id: req.body.league_id || draftpick.get('league_id'), //unnecessary column?
      player_id: req.body.player_id || draftpick.get('player_id'),
      bid: req.body.bid || draftpick.get('bid'),
      drafted_owner_id: req.body.drafted_owner_id || draftpick.get('drafted_owner_id'),
      current_owner_id: req.body.current_owner_id || draftpick.get('current_owner_id'),
      drafted: req.body.drafted  || draftpick.get('drafted'),
      draft_id: req.body.draft_id || draftpick.get('draft_id'),
      violation: req.body.violation || draftpick.get('violation'),
      keeper_status_id: req.body.keeper_status_id  || draftpick.get('keeper_status_id'),
      keeper_year: req.body.keeper_year  || draftpick.get('keeper_year')
    })
    .then(function (draftpick) {
      res.json(draftpick);
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

  Draftpick.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(function (draftpick) {
    draftpick.save({
      active: false,
    })
    .then(function (draftpick) {
      res.json(draftpick);
    })
    .catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};
