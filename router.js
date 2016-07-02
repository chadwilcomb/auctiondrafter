const express = require('express')
const authController = require('./api/controllers/auth');
    home = require('./api/controllers/home'),
    player = require('./api/controllers/player'),
    team = require('./api/controllers/team')
    league = require('./api/controllers/league'),
    owner = require('./api/controllers/owner'),
    draft = require('./api/controllers/draft'),
    roster = require('./api/controllers/roster'),
    draftpick = require('./api/controllers/draftpick'),
    trade = require('./api/controllers/trade');

// Create our Express router
var router = express.Router();

// API Routes
router.route('/api/player')
  .get(authController.isAuthenticated, player.index)
  .post(authController.isAuthenticated, player.create);

router.route('/api/player/:id')
  .get(authController.isAuthenticated, player.getById)
  .put(authController.isAuthenticated, player.update)
  .delete(authController.isAuthenticated, player.deactivate);

router.route('/api/player/autocomplete/:term')
  .get(authController.isAuthenticated, player.autocomplete);

router.route('/api/team/')
  .get(authController.isAuthenticated, team.index)
  .post(authController.isAuthenticated, team.create);

router.route('/api/team/:abbr')
  .get(authController.isAuthenticated, team.byAbbr);

router.route('/api/team/:id')
  .put(authController.isAuthenticated, team.update)
  .delete(authController.isAuthenticated, team.deactivate);

router.route('/api/league')
  .get(authController.isAuthenticated, league.index)
  .post(authController.isAuthenticated, league.create);

router.route('/api/league/:id')
  .put(authController.isAuthenticated, league.update)
  .delete(authController.isAuthenticated, league.deactivate);

router.route('/api/owner/')
  .get(authController.isAuthenticated, owner.index)
  .post(authController.isAuthenticated, owner.create);

router.route('/api/owner/:username')
  .get(authController.isAuthenticated, owner.getByUsername)
  .put(authController.isAuthenticated, owner.update)
  .delete(authController.isAuthenticated, owner.deactivate);

router.route('/api/owner/league/:id')
  .get(authController.isAuthenticated, owner.forLeague);

router.route('/api/draft')
  .get(authController.isAuthenticated, draft.index)
  .post(authController.isAuthenticated, draft.create);

router.route('/api/draft/:id')
  .get(authController.isAuthenticated, draft.getById)
  .put(authController.isAuthenticated, draft.update)
  .delete(authController.isAuthenticated, draft.deactivate);

router.route('/api/roster')
  .get(authController.isAuthenticated, roster.index);

router.route('/api/roster:id')
  .get(authController.isAuthenticated, roster.getById);

router.route('/api/draftpick')
  .get(authController.isAuthenticated, draftpick.index)

router.route('/api/draftpick/:id')
  .get(authController.isAuthenticated, draftpick.getById);

router.route('/api/draftpick/keepers/league/:id')
  .get(authController.isAuthenticated, draftpick.getKeepersForLeague);

router.route('/api/draftpick/keepers/league/:league_id/owner/:owner_id')
  .get(authController.isAuthenticated, draftpick.getKeepersForLeagueOwner);

router.route('/api/trade')
  .get(authController.isAuthenticated, trade.index)
  .post(authController.isAuthenticated, trade.submitTrade);

router.route('/api/trade/:id')
  .get(authController.isAuthenticated, trade.getById)
  .put(authController.isAuthenticated, trade.update)

router.route('/api/trade/league/:id')
  .get(authController.isAuthenticated, trade.getTradesForLeague);

router.route('/api/trade/league/:league_id/owner/:owner_id')
  .get(authController.isAuthenticated, trade.getTradesForLeagueOwner);


router.route('/api/').get(home.isAlive);

// WEB CLIENT Routes
router.route('/*')
  .get(function(req, res) {
    res.sendFile(__dirname + '/index.html')
  });

module.exports = router;
