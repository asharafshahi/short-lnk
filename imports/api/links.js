import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) { 
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        regEx: SimpleSchema.RegEx.Url
      } 
    }).validate({ url });

    Links.insert({ 
      _id: shortid.generate(), 
      url, 
      userId: this.userId, 
      visible: true,
      lastVisited: null,
      visitedCount: 0
    });
  },
  'links.setVisibility'(_id, visible ) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Links.update({ _id }, { $set: { visible }});
  },
  'links.trackVisit'(_id) {
    Links.update({ _id }, { 
      $set: { 
        lastVisited: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    });
  }
});