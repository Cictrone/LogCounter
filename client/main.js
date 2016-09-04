import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Players = new Mongo.Collection('players');

START_WORTH = 10;
WORTH_INCREMENT = 5;
MAX_WORTH = 30;

LEVEL_NAMES = ["N00B", "Casual", "Average", "Skilled", "Master"];


import './main.html';

Session.setDefault('prompt', 'login');

Template.body.helpers({
  players(){
    return Players.find({});
  },
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
    },
    'click #changeToRegister': function(event){
      event.preventDefault();
      Session.set('prompt', 'register');
    }
});

Template.dashboard.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.dashboard.rendered = function(){
  Players.update(
    {
      _id: Players.findOne({name: player.name})['_id']
    },
    {
      name: Meteor.user().username,
      worth: START_WORTH,
      worth_level: START_WORTH,
      drink: 1,
      total_drinks: 0,
      level_name: LEVEL_NAMES[0]
    }
  );
};

Template.dashboard.helpers({
  player(){
    player = Players.findOne({name: Meteor.user().username});
    if (player){
      return player;
    }
    Players.insert(
      {
        name: Meteor.user().username,
        worth: START_WORTH,
        worth_level: START_WORTH,
        drink: 1,
        total_drinks: 0,
        level_name: LEVEL_NAMES[0]
      }
    );
    player = Players.findOne({name: Meteor.user().username});
    return player;
  }
});

Template.dashboard.events({
  'click #up-button'(event){
    event.preventDefault();

    Players.update(
      {
        _id: Players.findOne({name: player.name})['_id']
      },
      {
        name: player.name,
        worth: (player.worth+1),
        worth_level: player.worth_level,
        drink: player.drink,
        total_drinks : player.total_drinks - 1,
        level_name: LEVEL_NAMES[(player.worth_level/5)-2]
      }
    );
  },

  'click #down-button'(event){
    event.preventDefault();

    if(player.worth-- == 1){
      if(player.drink == 2){
        if(player.worth_level != MAX_WORTH){
          player.worth_level += WORTH_INCREMENT;
          player.drink = 1;
        }
        else{
          player.drink += 1;
        }
        player.worth = player.worth_level;
      }
      else{
        player.drink += 1;
        player.worth = player.worth_level;
      }
    }

    Players.update(
      {
        _id: Players.findOne({name: player.name})['_id']
      },
      {
        name: player.name,
        worth: player.worth,
        worth_level: player.worth_level,
        drink: player.drink,
        total_drinks: player.total_drinks + 1,
        level_name: LEVEL_NAMES[(player.worth_level/5)-2]
      }
    );
  },

  'click #reset-button'(event){
    event.preventDefault();

    player.worth = START_WORTH;
    player.worth_level = START_WORTH;
    player.drink = 1;

    Players.update(
      {
        _id: Players.findOne({name: player.name})['_id']
      },
      {
        name: player.name,
        worth: player.worth,
        worth_level: player.worth_level,
        drink: player.drink,
        total_drinks : 0,
        level_name: LEVEL_NAMES[0]
      }
    );
  }
});
