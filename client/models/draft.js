import Model from 'ampersand-model';
import authMixin from '../helpers/api-auth-mixin'
import OwnerCollection from './owner-collection'

export default Model.extend(authMixin, {

  idAttribute: 'id',

  props: {
    id: 'number',
    location: 'string',
    year: 'number',
    draft_date: 'date',
    league_id: 'number',
    active: 'boolean'
  }

});
