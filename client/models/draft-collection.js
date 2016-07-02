import Collection from 'ampersand-rest-collection';
import Draft from './draft';
import authMixin from '../helpers/api-auth-mixin';

export default Collection.extend(authMixin, {

    url () {
      return '/api/draft';
    },

    model: Draft,

    mainIndex: 'id'

});
