import Model from 'ampersand-model';
import authMixin from '../helpers/api-auth-mixin'
import Player from './player'

export default Model.extend(authMixin, {

  idAttribute: 'id',

  props: {
    id: 'number',
    draft_id: 'number',
    roster_id: 'number',
    player_id: 'number',
    league_id: 'number',
    bid: 'number',
    drafted_owner_id: 'number',
    current_owner_id: 'number',
    drafted: 'date',
    keeper_status_id: 'number',
    keeper_year: 'number',
    violation: 'boolean',
    active: 'boolean'
  },

  children: {
    player: Player
  }

});
