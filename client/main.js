import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Players = new Mongo.Collection('players');
Games = new Mongo.Collection('games');
Articles = new Mongo.Collection('articles');

var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
 stores: [imageStore]
});

// probably belongs in Meteor.startup - server side
Games.insert(
  {
    _id : 'null',
    numPlayers: 0,
    player_list: []
  }

);


START_WORTH = 10;
WORTH_INCREMENT = 5;
MAX_WORTH = 30;

LEVEL_NAMES = ["N00B", "Casual", "Average", "Skilled", "Master"];


import './main.html';

Session.setDefault('prompt', 'login');

Template.body.helpers({
  promptPage(){
    return Session.get('prompt');
  }
});

Template.register.events({
    'submit form': function(event) {
      event.preventDefault();
      var usernameVar = event.target.registerUsername.value;
      var passwordVar = event.target.registerPassword.value;
      Accounts.createUser({
          username: usernameVar,
          password: passwordVar
      });
      if(!Players.findOne({name: usernameVar})){
        Players.insert({
          name: usernameVar,
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
		Games.update({
			_id: Games.findOne({_id: 'null'})['_id']
		},
		{$push:
		  {
			player_list : usernameVar
		  }
		});
		Session.set('prompt', 'dashboard');

    },
    'click #changeToLogin': function(event){
      event.preventDefault();
      Session.set('prompt', 'login');
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var usernameVar = event.target.loginUsername.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(usernameVar, passwordVar);
        if(Meteor.user()){
          Session.set('prompt', 'dashboard');
        }
    },
    'click #changeToRegister': function(event){
      event.preventDefault();
      Session.set('prompt', 'register');
    }
});
