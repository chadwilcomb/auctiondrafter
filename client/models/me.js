import Model from 'ampersand-model'
import authMixin from '../helpers/api-auth-mixin'
import LeagueCollection from './league-collection'

export default Model.extend(authMixin, {

  url () {
    let url = '/api/owner/';
    if (this.isRegister) {
      return url;
    }
    return url + this.username;
  },

  initialize () {
    if (window.localStorage.me) {
      this.set(JSON.parse(window.localStorage.me));
    }
    this.on('change:username change:password', this.updateAuthHeader);
    this.on('change', this.syncToLocalStorage);
    this.on('change:authenticated', this.fetchInitialData);
  },

  props: {
    id: 'number',
    name: 'string',
    email: 'string',
    joined: 'date',
    role_id: 'number',
    username: 'string',
    active: 'boolean',
    password: 'string'
  },

  session: {
    authenticated: {
      type: 'boolean',
      default: false
    },
    isRegister: {
      type: 'boolean',
      default: false
    },
    authHeader: 'object'
  },

  collections: {
    leagues: LeagueCollection
  },

  syncToLocalStorage () {
    window.localStorage.me = JSON.stringify({
      username: this.username,
      authHeader: this.authHeader,
      authenticated: this.authenticated
    });
  },

  updateAuthHeader () {
    this.authHeader = window.localStorage.authHeader = {
      Authorization: 'Basic ' + btoa(this.username + ":" + this.password)
    };
  },

  fetchInitialData () {
    if (this.authHeader) {
      this.leagues.fetch();
    }
  }

});
