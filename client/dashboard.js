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
		level: 0,
        worth: START_WORTH,
		next_worth: START_WORTH,
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
 'click #level-up-button'(event){
    event.preventDefault();

    Players.update(
      {
        _id: Players.findOne({name: player.name})['_id']
      },
      {
        name: player.name,
		level: (player.level+1),
        worth: player.worth,
        worth_level: player.worth_level,
		next_worth: player.next_worth,
        glass: player.glass,
        total_drinks : player.total_drinks - 1,
        level_name: LEVEL_NAMES[(player.worth_level/5)-2]
      }
    );
  },
  
 'click #level-down-button'(event){
    event.preventDefault();

    Players.update(
      {
        _id: Players.findOne({name: player.name})['_id']
      },
      {
        name: player.name,
		level: (player.level-1),
        worth: player.worth,
        worth_level: player.worth_level,
		next_worth: player.next_worth,
        glass: player.glass,
        total_drinks : player.total_drinks - 1,
        level_name: LEVEL_NAMES[(player.worth_level/5)-2]
      }
    );
  },

  'click #up-button'(event){
    event.preventDefault();

    Players.update(
      {
        _id: Players.findOne({name: player.name})['_id']
      },
      {
        name: player.name,
		level: player.level,
        worth: (player.worth+1),
        worth_level: player.worth_level,
		next_worth: player.next_worth,
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
          player.worth_level == player.next_worth;
		  player.next_worth  += WORTH_INCREMENT;
          player.glass = 1;
        }
        else{
          player.glass += 1;
        }
      }
      else{
        player.glass += 1;
      }
	  player.worth = player.worth_level;
    }

    Players.update(
      {
        _id: Players.findOne({name: player.name})['_id']
      },
      {
        name: player.name,
		level: player.level,
        worth: player.worth,
        worth_level: player.worth_level,
		next_worth: player.next_worth,
        glass: player.glass,
        total_drinks: player.total_drinks + 1,
        level_name: LEVEL_NAMES[(player.worth_level/5)-2]
      }
    );
  },

  'click #reset-button'(event){
    event.preventDefault();
	if (confirm("Did you accidently press reset again Ryan?") == true) {
        alert ("NEW GAME!");
    
    player.worth = START_WORTH;
    player.worth_level = START_WORTH;
	player.next_worth = START_WORTH;
    player.glass = 1;

    Players.update(
      {
        _id: Players.findOne({name: player.name})['_id']
      },
      {
        name: player.name,
		level: 0,
        worth: player.worth,
        worth_level: player.worth_level,
		next_worth: player.next_worth,
        glass: player.glass,
        total_drinks : 0,
        level_name: LEVEL_NAMES[0]
      }
    );
	} else {
        aket("You boosted bastard!");
    }
  }
});
