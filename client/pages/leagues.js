import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'InputPage',

  render () {
    const {leagues} = this.props;

    return (
      <div>
        {leagues.map(league => {
          return (
            <div key={league.id}>
              <h2>{league.name}</h2>
              <div>Founded: {new Date(league.created).toLocaleDateString()}</div>
              <div>Drafts:</div>
              <ul>
              {league.drafts.map(draft => {
                const href = '/draft/' + draft.id;
                return (
                  <li key={draft.id}>
                    <div>{new Date(draft.draft_date).toLocaleDateString()} {draft.location} <a href={href}>Details</a></div>
                  </li>
                )
              })}
              </ul>
              <div>League Members:</div>
              <ul>
              {league.owners.map(owner => {
                return (
                  <li key={owner.id}>
                    <div>{owner.name} {owner.email}</div>
                  </li>
                )
              })}
              </ul>
            </div>
          )
        })}
      </div>
    )

  }

});
