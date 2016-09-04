import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Players = new Mongo.Collection('players');

Meteor.startup(() => {
  // do stuffs?
});
