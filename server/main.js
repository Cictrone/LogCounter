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
  if(!Games.findOne({_id: 'null'})){
    Games.insert(
      {
        _id : 'null',
        numPlayers: 0,
        player_list: []
      }

    );
  }
});
