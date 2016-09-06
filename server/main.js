import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Players = new Mongo.Collection('players');

var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
 stores: [imageStore]
});

Meteor.startup(() => {
  // do stuffs?
});
