import Model from 'ampersand-model';
import app from 'ampersand-app'
// import moment from 'moment'
import authMixin from '../helpers/api-auth-mixin'

export default Model.extend(authMixin, {

  idAttribute: 'id',

  props: {
    id: 'number',
    name: 'string',
    email: 'string',
    joined: 'date',
    role_id: 'number',
    username: 'string',
    active: 'boolean'
  }

  // isNew () {
  //   return !this._id;
  // },

  // methodToURL (method) {
  //   let url = '/api/day/';
  //   switch (method) {
  //     // case 'read':
  //     // case 'update':
  //     // case 'delete':
  //     case 'create':
  //       return url;
  //     default:
  //       return url + this.getId();
  //   };
  //
  // },

  // sync: function(method, model, options) {
  //   options = options || {};
  //   options.url = model.methodToURL(method.toLowerCase());
  //
  //   return Model.prototype.sync.apply(this, arguments);
  // },



});
