import app from 'ampersand-app'
import Router from './router'
import Me from './models/me'
// import bootstrap from 'bootstrap-loader'
import styles from './styles/main.scss'

// require('file?name=favicon.ico!./images/favicon/favicon.ico');
// require('file?name=images/favicon/favicon.ico!./images/favicon/favicon.ico');
// require('file?name=images/favicon/apple-touch-icon.png!./images/favicon/apple-touch-icon.png');
// require('file?name=images/favicon/apple-touch-icon-57x57.png!./images/favicon/apple-touch-icon-57x57.png');
// require('file?name=images/favicon/apple-touch-icon-72x72.png!./images/favicon/apple-touch-icon-72x72.png');
// require('file?name=images/favicon/apple-touch-icon-76x76.png!./images/favicon/apple-touch-icon-76x76.png');
// require('file?name=images/favicon/apple-touch-icon-114x114.png!./images/favicon/apple-touch-icon-114x114.png');
// require('file?name=images/favicon/apple-touch-icon-120x120.png!./images/favicon/apple-touch-icon-120x120.png');
// require('file?name=images/favicon/apple-touch-icon-144x144.png!./images/favicon/apple-touch-icon-144x144.png');
// require('file?name=images/favicon/apple-touch-icon-152x152.png!./images/favicon/apple-touch-icon-152x152.png');
// require('file?name=images/favicon/apple-touch-icon-180x180.png!./images/favicon/apple-touch-icon-180x180.png');

//expose 'app' to browser console for debugging
window.app = app;

app.extend({
  init () {
    // const _this = this;
    this.me = new Me();
    this.startRouter();
  },
  startRouter () {
    this.router = new Router();
    this.router.history.start();
  }
});

app.init();
