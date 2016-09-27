import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Players = new Mongo.Collection('players',{Mongo:'Mongo'});
Games = new Mongo.Collection('games');
Articles = new Mongo.Collection('articles');
var imageStore = new FS.Store.GridFS("images");


Images = new FS.Collection("images", {
 stores: [imageStore]
});


Meteor.startup(() => {
  Games.update(
    {_id : 'null'},
    {$set:{
        numPlayers: 0,
        player_list: []
    }},
    {upsert: 'true'}
  );
  Players.update(
    {_id : 'null'},
    {$set:{
      name: "Admin",
      isAdmin: 0,
      isingame: 0,
      game_id: 'null',
      level: 0,
      wins: 0,
      worth: 0,
      next_worth: 0,
      worth_level: 0,
      glass: 1,
      total_drinks: 0,
      all_time_drinks: 0,
      level_name: 0
    }},
    {upsert: 'true'}
  );
  });
