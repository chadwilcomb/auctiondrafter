import React from 'react';
import ampersandMixin from 'ampersand-react-mixin'
import Draft from '../models/draft'

export default React.createClass({
  mixins: [ampersandMixin],
  displayName: 'DraftDetail',

  render () {
    const {draft} = this.props;
    const draft_date = draft.draft_date ? new Date(draft.draft_date).toLocaleDateString() : '';
    return (
      <div>
        <h1>{draft.location}</h1>
        <h2>{draft_date}</h2>
          {draft.rosters.map(roster => {
            return (
              <div key={roster.id}>
                <div>{roster.owner.name}</div>
                <div>Draftpicks:</div>
                <ul>
                  {roster.draftpicks.map(draftpick => {
                    console.log(draftpick.player);
                    return (
                      <li key={draftpick.id}>{draftpick.player.full_name} {draftpick.player.position} ${draftpick.bid}</li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
      </div>
    )
  }
})
