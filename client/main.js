import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Players = new Mongo.Collection('players');
Games = new Mongo.Collection('games');
Articles = new Mongo.Collection('articles');

var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
 stores: [imageStore]
});


START_WORTH = 10;
WORTH_INCREMENT = 5;
MAX_WORTH = 30;

LEVEL_NAMES = ["N00B", "Casual", "Average", "Skilled", "Master"];

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-bottom-full-width",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "200",
  "timeOut": "2500",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};


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
        Games.update({
          _id: Games.findOne({_id: 'null'})['_id']
        },
        {$push:
          {
            player_list : usernameVar
          }
        });
        Session.set('prompt', 'dashboard');
        toastr.success('Your account has been created!', 'Account Created!')
      }
      else{
        toastr.error('The given username is already an account on the system.', 'Account Exists!')
      }


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
        Meteor.loginWithPassword(usernameVar, passwordVar, function(){
          if(Meteor.user()){
            Session.set('prompt', 'dashboard');
          }
          else{
            toastr.error("Username or Password is incorrect.", "Login Failed!")
          }
        });
    },
    'click #changeToRegister': function(event){
      event.preventDefault();
      Session.set('prompt', 'register');
    }
});
