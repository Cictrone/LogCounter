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
      });
  }
  if(!Players.findOne({_id:'Admin'})){
    Accounts.createUser({
        username: 'Admin',
        password: 'Root'
    });
    Players.insert({
      _id: 'Admin',
      name: 'Admin',
      isingame: 0,
      game_id: 'null',
      level: 0,
      wins: 0,
      worth: START_WORTH,
      next_worth: START_WORTH,
      worth_level: START_WORTH,
      glass: 1,
      total_drinks: 0,
      all_time_drinks: 0,
      level_name: LEVEL_NAMES[0]
    });
  }
});
