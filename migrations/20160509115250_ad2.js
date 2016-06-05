var keeperYears = ['drafted', 'keep_first', 'keep_second', 'keep_third'];
var keeperStatuses = ['pending', 'dropped', 'retained'];
var tradeStatuses = ['proposed', 'accepted', 'rejected', 'cancelled'];

exports.up = function(knex, Promise) {
  return knex.schema.createTable('leagues', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.boolean('active').defaultTo(true);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    console.log('leagues created');
  }).createTable('players', function(table) {
    table.string('id').primary();
    table.string('full_name');
    table.string('position');
    table.boolean('active').defaultTo(true);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    console.log('players created');
  }).createTable('teams', function(table) {
    table.string('team_id').primary();
    table.string('city');
    table.string('name');
    table.boolean('active').defaultTo(true);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    console.log('teams created');

  }).createTable('users', function(table) {
    table.increments('uid').primary();
    table.string('username');
    table.string('password');
    table.string('name');
    table.string('email');
    table.integer('league_id')
      .references('id')
      .inTable('leagues');
    table.boolean('active').defaultTo(true);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    console.log('users created');

  }).createTable('drafts', function(table) {
    table.increments('id').primary();
    table.string('location');
    table.dateTime('draft_date');
    table.integer('league_id')
      .references('id')
      .inTable('leagues');
    table.boolean('active').defaultTo(true);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    console.log('drafts created');

  }).createTable('rosters', function(table) {
    table.increments('id').primary();
    table.integer('draft_id')
      .references('id')
      .inTable('drafts');
    table.integer('user_id')
      .references('uid')
      .inTable('users');
    table.boolean('active').defaultTo(true);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    console.log('rosters created');

  }).createTable('draftpicks', function(table){
    table.increments('id').primary();
    table.integer('roster_id')
      .references('id')
      .inTable('rosters');
    table.string('player_id')
      .references('id')
      .inTable('players');
    table.integer('current_owner_id')
      .references('uid')
      .inTable('users');
    table.integer('drafted_owner_id')
      .references('uid')
      .inTable('users');
    table.integer('bid');
    table.dateTime('drafted');
    table.boolean('violation').defaultTo(false);
    table.enu('keeper_year', keeperYears);
    table.enu('keeper_status', keeperStatuses);
    table.boolean('active').defaultTo(true);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    console.log('draftpicks created');

  }).createTable('trades', function(table){
    table.increments('id').primary();
    table.integer('from_user_id')
      .references('uid')
      .inTable('users');
    table.integer('to_user_id')
      .references('uid')
      .inTable('users');
    table.integer('cash').unsigned().defaultTo(0);
    table.boolean('cash_direction');
    // table.integer('from_cash').unsigned().defaultTo(0);
    // table.integer('to_cash').unsigned().defaultTo(0);
    table.enu('status', tradeStatuses);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    console.log('trades created');
  }).createTable('trades_draftpicks', function(table){
    table.increments('id').primary();
    table.integer('trade_id')
      .references('id')
      .inTable('trades');
    table.integer('draftpick_id')
      .references('id')
      .inTable('draftpicks');
    table.boolean('direction');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    console.log('trades_draftpicks created');
    // table.enu('trade_direction', tradeDirections);
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.table('trades_draftpicks', function (table) {
    table.dropForeign('trade_id');
    table.dropForeign('draftpick_id');
  })
  .table('trades', function (table) {
    table.dropForeign('from_user_id');
    table.dropForeign('to_user_id');
  })
  .table('draftpicks', function (table) {
    table.dropForeign('roster_id');
    table.dropForeign('player_id');
  })
  .table('rosters', function (table) {
    table.dropForeign('draft_id');
    table.dropForeign('user_id');
  })
  .table('drafts', function (table) {
    table.dropForeign('league_id');
  })
  .table('users', function (table) {
    table.dropForeign('league_id');
  })
  .dropTable('rosters')
  .dropTable('drafts')
  .dropTable('draftpicks')
  .dropTable('trades')
  .dropTable('trades_draftpicks')
  .dropTable('users')
  .dropTable('leagues')
  .dropTable('players')
  .dropTable('teams');
};
