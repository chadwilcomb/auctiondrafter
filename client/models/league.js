import Model from 'ampersand-model';
import authMixin from '../helpers/api-auth-mixin'
import OwnerCollection from './owner-collection'
import DraftCollection from './draft-collection'

export default Model.extend(authMixin, {

  idAttribute: 'id',

  props: {
    id: 'number',
    name: 'string',
    created: 'string',
    founder_id: 'number',
    active: 'boolean'
  },

  collections: {
    owners: OwnerCollection,
    drafts: DraftCollection
  }

});
