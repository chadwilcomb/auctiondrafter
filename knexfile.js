module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : 'localhost',
      port     : '5432',
      user     : 'cwilcomb',
      database : 'auctiondrafter_dev',
      // charset  : 'UTF8_GENERAL_CI'
    }
  },
  heroku: process.env.DATABASE_URL
}
