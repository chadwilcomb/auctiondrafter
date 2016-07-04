import Collection from 'ampersand-rest-collection';
import Draftpick from './draftpick';
import authMixin from '../helpers/api-auth-mixin';

export default Collection.extend(authMixin, {

    url () {
      return '/api/draftpick';
    },

    model: Draftpick,

    mainIndex: 'id'

});
