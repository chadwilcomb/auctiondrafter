import Model from 'ampersand-model';
import authMixin from '../helpers/api-auth-mixin'
// import DraftpickCollection from './draftpick-collection'
import RosterCollection from './roster-collection'
import League from './league'

export default Model.extend(authMixin, {

  url () {
    return '/api/draft/' + this.getId();
  },

  idAttribute: 'id',

  props: {
    id: 'number',
    location: 'string',
    year: 'number',
    draft_date: 'date',
    league_id: 'number',
    active: 'boolean'
  },

  children: {
    league: League
  },

  collections: {
    // draftpicks: DraftpickCollection,
    rosters: RosterCollection
  }

});
