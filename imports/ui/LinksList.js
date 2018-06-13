import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';
import { Links } from '../api/links';
import { Meteor } from 'meteor/meteor';
import LinksListItem from './LinksListItem';

class LinksList extends Component {

  renderLinkListItems() {
    if (this.props.links.length === 0) {
      return (
        <div className='link-list-item'>
          <p className='item__status-message'>No Links Found</p>
        </div>
      );
    }
    
    return this.props.links.map(link => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
    })
  }

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinkListItems()}
        </FlipMove>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('links');
  return {
    links: Links.find({ visible: Session.get('showVisible') }).fetch(),
  };
})(LinksList);
