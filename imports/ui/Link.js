import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinkListFilters';

export default Link = () => {
  return (
    <div >
      <PrivateHeader title="Your Links" />
        <LinksListFilters />
        <AddLink />
        <LinksList />
    </div>
  );
}