import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-config';

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((req, res, next) => {
    if (req.url !== '/links' && req.url !== '/signup' && req.url != '/') {
      const result = Links.findOne({ _id: req.url.substring(1) });
      if (result) {
        Meteor.call('links.trackVisit', req.url.substring(1));
        res.statusCode = 302;
        res.setHeader('Location', result.url);
        res.end();
      } else {
        next();
      }
    } else {
      next();
    }
  });
});
