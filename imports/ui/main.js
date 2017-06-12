import { Template } from 'meteor/templating';

import '../startup/accounts-config.js';

import './main.html';
import './post.js';
import './messages';

Template.main.onCreated(function mainOnCreated() {

});

Template.main.rendered = function() {

};


Template.main.helpers({
  
});

Template.main.events({

});
