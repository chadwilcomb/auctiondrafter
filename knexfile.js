module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : 'localhost',
      port     : '5432',
      user     : 'cwilcomb',
      // password : 'foosecret',
      database : 'auctiondrafter_dev',
      // charset  : 'UTF8_GENERAL_CI'
    }
  },
  heroku: {
    client: 'postgresql',
    connection: {
      host     : 'ec2-54-227-240-164.compute-1.amazonaws.com',
      port     : '5432',
      user     : 'lgcujwsugdubeu',
      password : '5jHz9aOfO3QfKcU35P2MsecJlg',
      database : 'd4ev8ls99895h8',
      // charset  : 'UTF8_GENERAL_CI'
    }
  }
}
