import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';


export default class Signup extends Component {
  state = {
    error: ''
  };

  handleSignup(e) {
    e.preventDefault();
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    Accounts.createUser({ email, password }, (err) =>{
      console.log('Signup callback', err);
      if (err) {
        this.setState({ error: err.message });
      } else {
        this.setState({ error: '' });
      }
    });

  }

  render() {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Signup</h1>
          {this.state.error && 
            <p>{this.state.error}</p>}
          <form onSubmit={this.handleSignup.bind(this)} noValidate className='boxed-view__form'>
            <input type='email' ref='email' name='email' placeholder='email'/>
            <input type='password' ref='password' name='password' placeholder='password'/>
            <button className='button'>Sign Up</button>
          </form>
          <p><Link to='/'>Already have an account?</Link></p>
        </div>
      </div>
    );
  }
}
