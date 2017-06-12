
import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('messages');

let MessagesSchema = new SimpleSchema({
  'text': { 
    type: String,
    label: () => 'Message Text',
    trim: true,
  },
  'poster': { 
    type: String,
    label: () => 'Poster id',
    trim: true,
  },
  'created_at': { 
    type: Date,
    label: () => 'created date', 
    trim: true,
  }
});

Messages.attachSchema( MessagesSchema );