import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const PrivateHeader = ({ title, history }) => {
  const onLogout = () => {
    Accounts.logout();
    history.push('/');
  }

  return (
      <div className='title-bar'>
        <div className='wrapper'>      
          <h1>{title}</h1>
          <a onClick={onLogout} className='logout'>Logout</a>
        </div>
      </div>
  );
}

PrivateHeader.propTypes = { 
  title: PropTypes.string.isRequired
}

export default withRouter(PrivateHeader);