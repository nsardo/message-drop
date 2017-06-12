
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Messages } from '../api/messages.js';
import './messages.html';

Template.messages.created = function() {
  Tracker.autorun(() => {
    Meteor.subscribe('messages');
  });
};

Template.messages.helpers({
  msg() {
    try {
      return Messages.find( {}, { sort: { created_at: -1 } });
    } catch(e) {
      throw new Meteor.Error('DB unavailable');
    }
  },
});

Template.messages.events({
  'click .js-delete-button'( e, t ) {
    e.preventDefault();

    let id = t.$(e.currentTarget).data('id');

    Meteor.call('messages.deleteMessage', id, (error, response) => {
      if (error) {
        Bert.alert('There is a problem deleting your message', 'danger', 'growl-top-right');
        return;
      } else {
        Bert.alert('Your message has been deleted.', 'success', 'growl-top-right');
      }
    });
  },
});