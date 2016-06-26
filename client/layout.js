import React from 'react'
import NavHelper from './components/nav-helper'
import Nav from './components/nav'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'Layout',

  render () {

    const {me} = this.props

    return (
      <NavHelper>
        <Nav me={me} />
        <div className='container-fluid'>
          { this.props.children }
        </div>
      </NavHelper>
    )
  }
})
