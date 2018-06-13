import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends Component {
  state = {
    url: '',
    modalOpen: false,
    error: '',
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (e) {
      Meteor.call('links.insert', this.state.url, (err, res) => {
        console.log(err);
        if (err) this.setState({ error: err.message });
        if (!err) this.handleModalClose();
      });
      e.target.value = '';
    }
  }

  handleModalClose() {
    this.setState({ modalOpen: false, url: '', error: '' });
  }

  render() {
    return (
      <div className='wrapper'>
        <button onClick={() => this.setState({ modalOpen: true })} className='button'>
          + Add Link
        </button>
        <Modal
          isOpen={this.state.modalOpen} 
          contentLabel='Add Link'
          onRequestClose={this.handleModalClose.bind(this)}
          onAfterOpen={() => this.refs.url.focus()}
          className='boxed-view__box'
          overlayClassName='boxed-view boxed-view--modal'>
          <h1>Add Link</h1>
          { this.state.error && <p>{this.state.error}</p>}
          <form onSubmit={this.onSubmit.bind(this)} className='boxed-view__form'>
            <input 
              onChange={e => this.setState({ url: e.target.value })}
              type='text' 
              name='url' 
              placeholder='url' 
              ref='url'
              value={this.state.url} 
            />
            <button className='button'>Add Link</button>
            <button type='button' className='button button--secondary' onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
          
        </Modal>
      </div>
    );
  }
}
