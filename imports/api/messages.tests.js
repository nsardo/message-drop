
/*
  TO RUN: meteor test --driver-package practicalmeteor:mocha
 */
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import '../../server/meteor-methods.js';

import { Messages } from './messages.js';

if ( Meteor.isServer ) {
  describe('Messages', () => {
    describe('methods', () => {
      describe('Users', () => { 
        const userId = Random.id();
        let msgId;

        beforeEach(() => {
          Messages.remove({});
          msgId = Messages.insert({
            text: 'a message',
            poster: userId,
            created_at: new Date()
          });
        });
        
        /* a Fake since logic for this is in middle-tier */
        it( 'user can add a message', () => {
          const saveMessage = Meteor.server.method_handlers['messages.test.user.saveMessage'];
          const invoke = { userId };
          let myObj = {
            text: 'my message',
            poster: userId,
            created_at: new Date()
          };
          let val = saveMessage.apply(invoke, [myObj]);
          assert.typeOf(val, 'string');
        });

        it( 'user can delete an owned message', () => {
          const deleteMessage = Meteor.server.method_handlers['messages.test.delete'];
          const invoke = { userId };
          deleteMessage.apply(invoke, [userId, msgId]);
          assert.equal(Messages.find().count(), 0);
        });

        it( 'user cannot delete an unowned message', () => {
          const thisUser = Random.id();
          const deleteMessage = Meteor.server.method_handlers['messages.test.delete'];
          const invoke = { thisUser };
          deleteMessage.apply( invoke, [thisUser,msgId]);
          assert.equal(Messages.find().count(), 1);
        });
      });
      describe('non-users', () => {

        /* another Fake, since this logic is in middle tier */
        it ( 'non-user cannot add a message', () => {
          const nonSaveMessage = Meteor.server.method_handlers['messages.test.non-user.saveMessage'];
          const invoke = {};
          let myObj = {
            text: 'my message',
            poster: '',
            created_at: new Date()
          };
          let myrtn = nonSaveMessage.apply( invoke, [myObj]);        
          assert.equal(myrtn, 'Cannot save');
        });

        it ( 'non-user cannot delete an unowned message', () => {
            const regUser = Random.id();
            const nonDeleteMessage = Meteor.server.method_handlers['messages.test.delete'];
            const invoke = {};
            let anId = Messages.insert({
              text: 'a message',
              poster: regUser,
              created_at: new Date()
            });
            let rtn = nonDeleteMessage.apply(invoke, ['',anId]);
            assert.equal(rtn, 'error');
          });

        });
      });
    });
}