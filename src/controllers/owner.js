'use strict';
const Owner = require('../models/owner')
const League = require('../models/league')

exports.index = function (req, res) {

  let query = { where: { active: true }};

  Owner
  .query(query)
  .fetchAll({ withRelated: ['leagues'] })
  .then(function (results) {
    res.json(results);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

exports.getById = function (req, res) {

  Owner
  .where({ id: req.params.id })
  .fetch({ withRelated: ['leagues'] })
  .then(function (owner) {
    return res.json(owner);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

exports.forLeague = function (req, res) {

  League
  .where({ id: req.params.id })
  .fetch({ withRelated: ['owners'] })
  .then(function (league) {
    res.json(league.related('owners'));
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};


//POST
exports.create = function (req, res) {

  Owner
  .forge({
    name: req.body.name,
    email: req.body.email,
    role_id: req.body.role_id || 2,
    username: req.body.username,
    active: req.body.active || true,
    password: req.body.password //hash strategy needed
  })
  .save()
  .then(function (owner) {
    owner.leagues().attach(req.body.league_id);
    // League.forge({ id: req.body.league_id }).owners().attach(owner);
    res.json(owner);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });
};

//PUT
exports.update = function (req, res) {

  Owner.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(function (owner) {
    owner.save({
      name: req.body.name || owner.get('name'),
      email: req.body.email || owner.get('email'),
      role_id: req.body.role_id || owner.get('role_id'),
      username: req.body.username || owner.get('username'),
      active: req.body.active || owner.get('active'),
      password: req.body.password  || owner.get('password')//hash strategy needed
    })
    .then(function (owner) {
      res.json(owner);
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

  Owner.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(function (owner) {
    owner.save({
      active: false,
    })
    .then(function (owner) {
      res.json(owner);
    })
    .catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};
