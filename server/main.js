import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Players = new Mongo.Collection('players');
Games = new Mongo.Collection('games');
Articles = new Mongo.Collection('articles');
var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
 stores: [imageStore]
});

Meteor.startup(() => {
  // do stuffs?
});
