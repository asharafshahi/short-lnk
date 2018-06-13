import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data'

class LinksListFilters extends Component {
  state = {
    showVisible: true
  }

  componentDidMount() {
    this.setState({ showVisible: this.props.showVisible })
  }

  render() {
    return (
      <div className='wrapper'>
        <label>
          <input 
            type='checkbox'
            checked={!this.state.showVisible} 
            onChange={e => {
              this.setState({showVisible: !e.target.checked});
              Session.set('showVisible', !e.target.checked);
            }}
          />
          Show hidden links
        </label>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    showVisible: Session.get('showVisible')
  }
})(LinksListFilters);