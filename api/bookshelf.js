var config = require('../knexfile.js');
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;

// knex.migrate.latest([config]);
// knex.migrate.rollback([config]);
// knex.seed.run([config]);
