import React from 'react';
import app from 'ampersand-app'
import ampersandMixin from 'ampersand-react-mixin';
import MessagePage from './message';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'RegisterUserPage',

    getInitialState () {
      return {
        username: '',
        password: '',
        confirm: '',
        error: ''
      };
    },

    onSubmitForm (event) {
      var _this = this;
      event.preventDefault();
      const {user} = this.props;
      this.setState({ error: '' });
      if (this.state.password !== this.state.confirm) {
        this.setState({ error: 'Passwords are not the same' });
        return false;
      }

      user.set({ isRegister: true });
      user.save(
        {
          username: this.state.username,
          password: this.state.password,
        },
        {
          success: function () {
            user.set({ isRegister: false });
            app.router.redirectTo('/');
          },
          error: function (model, response, options) {
            _this.setState({ error: response.responseText });
          }
        });
    },

    onPropChange (event) {
      const {name, value, type} = event.target;
      let state = {};
      state[name] = type === 'number' ? parseInt(value, 10) : value;
      this.setState(state);
    },

    render () {
      const {username,password,confirm,error} = this.state;
        return (
          <div className='container'>
            <h1>Register for AuctionDrafter</h1>
            <form name='createBeerForm' onSubmit={this.onSubmitForm}>
              <fieldset>
              <legend>Your info</legend>
                <div className={error ? 'message message-error' : 'hidden'}>{error}</div>
                <div className='form-group'>
                  <label htmlFor='inputUsername'>Username</label>
                  <input id='username' onChange={this.onPropChange} name='username' placeholder='Enter username' className='form-control' type='text' value={username} required/>
                </div>

                <div className='form-group'>
                  <label htmlFor='inputPassword'>Password</label>
                  <input id='password' onChange={this.onPropChange} name='password' placeholder='Enter password' className='form-control' type='password' value={password} required/>
                </div>

                <div className='form-group'>
                  <label htmlFor='type'>Confirm Password</label>
                  <input id='confirm' onChange={this.onPropChange} name='confirm' type='password' placeholder='Confirm password' className='form-control' value={confirm} required/>
                </div>

                <button type='submit' className='btn btn-default'>Register me!</button>
                <div>
                  <a href='/signin'>Already registered</a>
                </div>
              </fieldset>
            </form>
          </div>
        )
    }
})
