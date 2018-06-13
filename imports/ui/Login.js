import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class Login extends Component {
  state = {
    error: ''
  };

  handleLogin(e) {
    e.preventDefault();
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    Meteor.loginWithPassword(email, password, (err) => {
      console.log('login with callback', err);
      if (!err) {
        this.setState({ error: '' });
        this.props.history.push('/links');
      } else { 
        this.setState({ error: err.message });
      }
    });
  }

  render() {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Login to Short Link</h1>
          {this.state.error && 
            <p>{this.state.error}</p>}
          <form onSubmit={this.handleLogin.bind(this)} noValidate className='boxed-view__form'>
            <input type='email' ref='email' name='email' placeholder='email'/>
            <input type='password' ref='password' name='password' placeholder='password'/>
            <button className='button'>Sign In</button>
          </form>

          <Link to='/signup'>Have an account?</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);