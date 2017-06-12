
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Messages } from '../api/messages.js';
import './post.html';

Template.post.events({
  'click .js-post-button'( e, t ) {
    e.preventDefault();

    if ( ! Meteor.userId() ) {
      Bert.alert('You must be logged in first!', 'danger', 'growl-top-right');
      return;
    }

    let post_text = t.$('.js-post-text').val()
      , queuedMsgId
      , isValid;

    if ( post_text ) {
      const Msg_obj = ({
        text: post_text,
        poster: Meteor.userId(),
        created_at: new Date(),
      });

      isValid = Messages.simpleSchema().namedContext().validate( Msg_obj, {modifier:false}); 
      //example of local caching in local db
      if ( isValid )  {
        t.$('.js-post-text').val('');
        queuedMsgId = MyMessages.insert(Msg_obj);
        Bert.alert('Your Message has been posted!', 'success', 'growl-top-right');
      } else {
        Bert.alert('Invalid Data', 'danger', 'growl-top-right');
      }
    
      /* in 1 second, post to site db. right now, only exists in local */
      Meteor.setTimeout(() => {
        Meteor.call('messages.saveMessage', Msg_obj, function(error, response) {
          if (error) {
            Bert.alert('There was an error saving your message to permanent storage.', 'danger', 'growl-top-right');
            return;
          }
        });
        //remove from local db
        MyMessages.remove({_id: queuedMsgId});
      }, 1000);
    }
  },
});