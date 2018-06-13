import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Clipboard from 'clipboard';
import Lists from '../api/links';

export default class LinksListItem extends Component {
  state = {
    justCopied: false
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success', () => {
      this.setState({ justCopied: true });
      setTimeout(() => this.setState({ justCopied: false }), 500);
    }).on('error', () => {
      alert('unable to copy');
    })
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  onHide = (e) => { 
    e.preventDefault();
    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
  }

  render() {
    const { shortUrl, url, _id, visible, lastVisited, visitedCount } = this.props;
    const time = lastVisited !== null ? 
      `(visited ${moment(lastVisited).fromNow()})` : 'Never visited';
    return (
      <div className='wrapper'>
        <div className='link-list-item'>
          <h3>{url}</h3>
          <p>{shortUrl}</p>
          <p>{visitedCount} {visitedCount == 1 ? 'visit' : 'visits'} - {time}</p>
          <a className='button button--pill button--link' href={shortUrl} target='_blank'>Visit</a>
          <button className='button button--pill' ref='copy' data-clipboard-text={shortUrl}>
            { this.state.justCopied ? "Copied!" : "Copy" }
          </button>
          <button className='button button--pill' onClick={this.onHide}>
            { visible ? 'Hide' : 'Unhide' }
          </button>
        </div>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  shortUrl: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisited: PropTypes.number,
}