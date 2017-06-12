import { Template } from 'meteor/templating';

import '../startup/accounts-config.js';

import './main.html';
import './post.js';
import './messages';

Template.main.onCreated(function mainOnCreated() {
  // this.counter = new ReactiveVar(0);
});

Template.main.rendered = function() {

};


Template.main.helpers({
  /*
  counter() {
    return Template.instance().counter.get();
  },
  */
});

Template.main.events({
  /*
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  */
});