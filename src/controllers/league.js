const League = require('../models/league')

exports.index = function (req, res) {

  League
  .fetchAll({ withRelated: ['owners'] })
  .then(function (results) {
    res.json(results);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

exports.getById = function (req, res) {

  League
  .where({ id: req.params.id })
  .fetch({ withRelated: ['owners'] })
  .then(function (league) {
    return res.json(league);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};


//POST
exports.create = function (req, res) {

  League
  .forge({
    name: req.body.name,
    // created: req.body.created || new Date(),
    founder_id: req.body.founder_id,
    active: req.body.active || true,
    password: req.body.password //hash strategy needed
  })
  .save()
  .then(function (league) {
    if (req.body.owner_id) {
      league.owners().attach(req.body.owner_ids);
      // Owner.forge({ id: req.body.owner_id }).leagues().attach(league);
    }
    res.json(league);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });
};

//PUT
exports.update = function (req, res) {

  League.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(function (league) {
    league.save({
      name: req.body.name || league.get('name'),
      founder_id: req.body.founder_id || league.get('founder_id'),
      active: req.body.active || league.get('active'),
      password: req.body.password  || league.get('password')//hash strategy needed
    })
    .then(function (league) {
      res.json(league);
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

  League.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(function (league) {
    league.save({
      active: false,
    })
    .then(function (league) {
      res.json(league);
    })
    .catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};
