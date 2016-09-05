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
  promptPage(){
    return Session.get('prompt');
  }
});

Template.playerSummary.helpers({
  players(){
    return Players.find({}).fetch();
  }
});

Template.playerSummary.events({
  'click #changeToLogin': function(event){
    event.preventDefault();
    Session.set('prompt', 'login');
  },

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
    },
    'click #changeToSummary': function(event){
      event.preventDefault();
      Session.set('prompt', 'playerSummary');
    }
});
