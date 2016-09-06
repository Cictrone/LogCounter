import { Template } from 'meteor/templating';


Template.dashboard.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

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
        glass: 1,
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
        glass: player.glass,
        total_drinks : player.total_drinks - 1,
        level_name: LEVEL_NAMES[(player.worth_level/5)-2]
      }
    );
  },

  'click #down-button'(event){
    event.preventDefault();

    if(player.worth-- == 1){
      if(player.glass == 2){
        if(player.worth_level != MAX_WORTH){
          player.worth_level += WORTH_INCREMENT;
          player.glass = 1;
        }
        else{
          player.glass += 1;
        }
        player.worth = player.worth_level;
      }
      else{
        player.glass += 1;
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
        glass: player.glass,
        total_drinks: player.total_drinks + 1,
        level_name: LEVEL_NAMES[(player.worth_level/5)-2]
      }
    );
  },

  'click #reset-button'(event){
    event.preventDefault();

    player.worth = START_WORTH;
    player.worth_level = START_WORTH;
    player.glass = 1;

    Players.update(
      {
        _id: Players.findOne({name: player.name})['_id']
      },
      {
        name: player.name,
        worth: player.worth,
        worth_level: player.worth_level,
        glass: player.glass,
        total_drinks : 0,
        level_name: LEVEL_NAMES[0]
      }
    );
  }
});
