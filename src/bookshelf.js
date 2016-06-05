var config = require('../knexfile.js');
var env = 'development';
var knex = require('knex')(config[env]);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;

// knex.migrate.latest([config]);
// knex.migrate.rollback([config]);
// knex.seed.run([config]);
