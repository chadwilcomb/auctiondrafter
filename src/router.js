const home = require('./controllers/home'),
    player = require('./controllers/player'),
    team = require('./controllers/team')
    league = require('./controllers/league'),
    owner = require('./controllers/owner'),
    draft = require('./controllers/draft'),
    roster = require('./controllers/roster'),
    draftpick = require('./controllers/draftpick'),
    trade = require('./controllers/trade');

module.exports.initialize = function(app) {

  app.get('/api/', home.isAlive);

  app.get('/api/player', player.index);
  app.get('/api/player/:id', player.getById);
  app.get('/api/player/autocomplete/:term', player.autocomplete)
  app.post('/api/player', player.create);
  app.put('/api/player/:id', player.update);
  app.delete('/api/player/:id', player.deactivate);

  app.get('/api/team', team.index);
  app.get('/api/team/:abbr', team.byAbbr);
  app.post('/api/team', team.create);
  app.put('/api/team/:id', team.update);
  app.delete('/api/team/:id', team.deactivate);

  app.get('/api/league', league.index);
  app.get('/api/owner/:id', owner.getById);
  app.post('/api/league', league.create);
  app.put('/api/league/:id', league.update);
  app.delete('/api/league/:id', league.deactivate);

  app.get('/api/owner', owner.index);
  app.get('/api/owner/:id', owner.getById);
  app.get('/api/owner/league/:id', owner.forLeague);
  app.post('/api/owner', owner.create);
  app.put('/api/owner/:id', owner.update);
  app.delete('/api/owner/:id', owner.deactivate);

  app.get('/api/draft', draft.index);
  app.get('/api/draft/:id', draft.getById);
  app.post('/api/draft', draft.create);
  app.put('/api/draft/:id', draft.update);
  app.delete('/api/draft/:id', draft.deactivate);

  app.get('/api/roster', roster.index);
  app.get('/api/roster/:id', roster.getById);

  app.get('/api/draftpick', draftpick.index);
  app.get('/api/draftpick/:id', draftpick.getById);
  app.get('/api/draftpick/keepers/league/:id', draftpick.getKeepersForLeague);
  app.get('/api/draftpick/keepers/league/:league_id/owner/:owner_id', draftpick.getKeepersForLeagueOwner);

  app.get('/api/trade', trade.index);
  app.get('/api/trade/:id', trade.getById);
  app.get('/api/trade/league/:id', trade.getTradesForLeague);
  app.get('/api/trade/league/:league_id/owner/:owner_id', trade.getTradesForLeagueOwner);
  app.post('/api/trade', trade.submitTrade);
  app.put('/api/trade/:id', trade.update);

};
