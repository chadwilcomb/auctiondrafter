import Collection from 'ampersand-rest-collection';
import Owner from './owner';
import authMixin from '../helpers/api-auth-mixin';

export default Collection.extend(authMixin, {

    url () {
      return '/api/owner';
    },

    model: Owner,

    mainIndex: 'id'

});
