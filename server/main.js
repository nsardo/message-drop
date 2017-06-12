import { Meteor } from 'meteor/meteor';
import { Messages } from '../imports/api/messages.js';


Meteor.startup(() => {
  Meteor.publish('messages', function() {
    return Messages.find({});
  });
});
