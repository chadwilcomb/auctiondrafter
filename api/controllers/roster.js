const Roster = require('../models/roster')

exports.index = function (req, res) {

  Roster
  .fetchAll({ withRelated: ['owner', 'league', 'draft', 'draftpicks'] })
  .then(function (roster) {
    res.json(roster);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};

exports.getById = function (req, res) {

  Roster
  .where({ id: req.params.id })
  .fetch({ withRelated: ['owner', 'league', 'draft', 'draftpicks'] })
  .then(function (roster) {
    return res.json(roster);
  })
  .catch(function (err) {
    res.status(500).json({ error: err.message });
  });

};
