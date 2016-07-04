import Collection from 'ampersand-rest-collection';
import authMixin from '../helpers/api-auth-mixin';
import Roster from './roster';

export default Collection.extend(authMixin, {

    url () {
      return '/api/roster';
    },

    model: Roster,

    mainIndex: 'id'

});
