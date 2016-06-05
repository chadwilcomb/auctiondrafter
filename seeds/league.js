import seeder from 'knex-csv-seeder';

exports.seed = seeder({
  table: 'users',
  file: '../csv/league.csv',
  // recordsPerQuery: 100,
  // encoding: 'utf8' default encoding
  // parser: {
  //   delimiter: ',',
  //   quote: '"',
  //   escape: '\\'
  // }
});

//
// exports.seed = function(knex, Promise) {
//   return Promise.join(
//     // Deletes ALL existing entries
//     knex('leagues').del(),
//
//     // Inserts seed entries
//     knex('leagues').insert({id: 1, name: 'test league A'}),
//     knex('leagues').insert({id: 2, name: 'test league B'}),
//
//     // Deletes ALL existing entries
//     knex('users').del(),
//
//     // Inserts seed entries
//     knex('users').insert({ uid: 1, username: 'mike', password: 'chauntlet', name: 'Mike LaPlante', email: 'mikey@tfl.com', league_id: 1 }),
//     knex('users').insert({ uid: 2, username: 'ryan', password: 'chauntlet', name: 'Ryan Ferguson', email: 'ryan@tfl.com', league_id: 1 }),
//     knex('users').insert({ uid: 3, username: 'bob', password: 'chauntlet', name: 'Bob Monagan', email: 'bob@tfl.com', league_id: 1 }),
//     knex('users').insert({ uid: 4, username: 'pat', password: 'chauntlet', name: 'Pat McClain', email: 'pat@tfl.com', league_id: 1 }),
//     knex('users').insert({ uid: 5, username: 'jeff', password: 'chauntlet', name: 'Jeff Hooks', email: 'jeff@tfl.com', league_id: 1 }),
//     knex('users').insert({ uid: 6, username: 'nathan', password: 'chauntlet', name: 'Nathan Richards', email: 'nathan@tfl.com', league_id: 1 }),
//     knex('users').insert({ uid: 7, username: 'todd', password: 'chauntlet', name: 'Todd Cassin', email: 'todd@tfl.com', league_id: 1 }),
//     knex('users').insert({ uid: 8, username: 'tim', password: 'chauntlet', name: 'Tim Sovay', email: 'tim@tfl.com', league_id: 1 }),
//     knex('users').insert({ uid: 9, username: 'scott', password: 'chauntlet', name: 'Scott Wilken', email: 'scott@tfl.com', league_id: 1 }),
//     knex('users').insert({ uid: 10, username: 'chad', password: 'chauntlet', name: 'Chad Wilcomb', email: 'chad@tfl.com', league_id: 1 }),
//     knex('users').insert({ uid: 11, username: 'brad', password: 'chauntlet', name: 'Brad Hensley', email: 'brad@tfl.com', league_id: 1 }),
//     knex('users').insert({ uid: 12, username: 'josh', password: 'chauntlet', name: 'Josh Ploude', email: 'josh@tfl.com', league_id: 1 }),
//
//
//     // Deletes ALL existing entries
//     knex('drafts').del(),
//
//     // Inserts seed entries
//     knex('drafts').insert({ id: 1, location: 'Las Vegas', draft_date: new Date('09-01-2014'), league_id: 1 }),
//     knex('drafts').insert({ id: 2, location: 'Lake Tahoe', draft_date: new Date('09-01-2015'), league_id: 1 })
//   );
// };
