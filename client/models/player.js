import Model from 'ampersand-model';
import authMixin from '../helpers/api-auth-mixin'

export default Model.extend(authMixin, {

  idAttribute: 'id',

  props: {
    id: 'number',
    first_name: 'string',
    last_name: 'string',
    position: 'string',
    team_id: 'number',
    active: 'boolean'
  },

  derived: {
    full_name: {
      deps: ['first_name', 'last_name'],
      fn () {
        return this.first_name + ' ' + this.last_name;
      }
    },
  }

});
