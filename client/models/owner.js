import Model from 'ampersand-model';
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

});
