import seeder from 'knex-csv-seeder';

exports.seed = seeder({
  table: 'users',
  file: '../csv/draft.csv',
  // recordsPerQuery: 100,
  // encoding: 'utf8' default encoding
  // parser: {
  //   delimiter: ',',
  //   quote: '"',
  //   escape: '\\'
  // }
});


// exports.seed = function(knex, Promise) {
//   return Promise.join(
//     // Deletes ALL existing entries
//     knex('table_name').del(),
//
//     // Inserts seed entries
//     knex('table_name').insert({id: 1, colName: 'rowValue'}),
//     knex('table_name').insert({id: 2, colName: 'rowValue2'}),
//     knex('table_name').insert({id: 3, colName: 'rowValue3'})
//   );
// };
