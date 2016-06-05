module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : 'localhost',
      port     : '5432',
      user     : 'cwilcomb',
      // password : 'foosecret',
      // database : 'nfldb',
      database : 'auctiondrafter_dev',
      // charset  : 'UTF8_GENERAL_CI'
    }
  }
}
