import app from 'ampersand-app'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'ampersand-router'
import Layout from './layout'
import MessagePage from './pages/message'
import PublicPage from './pages/public'
import RegisterUserPage from './pages/register'
import LeaguesPage from './pages/leagues'

export default Router.extend({

  renderPage(page, opts = {layout: true}) {
    if(opts.layout) {
      page = (
        <Layout me={app.me}>
        {page}
        </Layout>
      );
    }
    ReactDOM.render(page, document.getElementById('root'))
  },

  routes: {
    '': 'leagues',
    'signin': 'public',
    'register': 'registerUser',
    'logout': 'logout',
    '*fourohfour': 'fourOhFour'
  },

  public () {
    if (!app.me.authenticated) {
      this.renderPage(<PublicPage me={app.me}/>, { layout: false });
    } else {
      this.redirectTo('/')
    }
  },

  registerUser () {
    if (!app.me.authenticated) {
      this.renderPage(<RegisterUserPage user={app.me}/>, { layout: false });
    } else {
      this.redirectTo('/');
    }
  },

  leagues () {
    if (!app.me.authenticated) {
      this.redirectTo('/signin');
    } else {
      app.me.fetch();
      this.renderPage(<LeaguesPage leagues={app.me.leagues} />)
    }
  },

  logout () {
    app.me.clear();
    window.localStorage.clear();
    window.location = '/signin';
  },

  fourOhFour () {
    this.renderPage(<MessagePage title='Page not found' />);
  }

});
