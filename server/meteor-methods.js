import { Messages } from '../imports/api/messages.js';

Meteor.methods({
  'messages.saveMessage': (message) => {
    check(message, Messages.simpleSchema())
    Messages.insert(message);
  },
  'messages.deleteMessage': (id) => {
    check(id, String);
    let rec = Messages.find({_id:id}).fetch()[0].poster;
    if ( rec == Meteor.userId() ) {
      Messages.remove({_id:id});
    } else {
      return;
    }
  },

  /* necessary because logic to insert posts is in middle tier */
  'messages.test.user.saveMessage': ( msg ) => {
    let rtn = Messages.insert(msg);
    return rtn;
  },
  'messages.test.non-user.saveMessage': (msg) => {
    return 'Cannot save';
  },

  /* necessary due to issue with Meteor.userId() during a test */
  'messages.test.delete': (uid, id) => {
    check(uid, String);
    check(id, String);
    let rec = Messages.find({_id:id}).fetch()[0].poster;
    if ( rec == uid ) {
      Messages.remove({_id:id});
    } else {
      return 'error';
    }    
  }
});