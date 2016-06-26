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
            <div>league.name</div>
          )
        })}
      </div>
    )

  }

});
