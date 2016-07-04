import Model from 'ampersand-model';
import authMixin from '../helpers/api-auth-mixin'
import DraftpickCollection from './draftpick-collection'
import Owner from './owner'
import League from './league'
import Draft from './draft'

export default Model.extend(authMixin, {

  idAttribute: 'id',

  props: {
    id: 'number',
    owner_id: 'number',
    league_id: 'number',
    draft_id: 'number',
    league_year: 'number',
    bid_balance: 'number'
  },

  children: {
    owner: Owner,
    // league: League,
    // draft: Draft
  },

  collections: {
    draftpicks: DraftpickCollection
  }

});
