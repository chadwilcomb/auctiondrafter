import Collection from 'ampersand-rest-collection';
import app from 'ampersand-app';
import League from './league';
import authMixin from '../helpers/api-auth-mixin';

export default Collection.extend(authMixin, {

    url () {
      return '/api/league';
    },

    model: League,

    mainIndex: 'id'

});
