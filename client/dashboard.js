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
		wins: 0,
        worth: START_WORTH,
		next_worth: START_WORTH,
        worth_level: START_WORTH,
        glass: 1,
        total_drinks: 0,
		all_time_drinks: 0,
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
	
	if( player.level < 9 && player.level != "Winner"){
		player.level += 1;
	}else if(player.level == 9){
		player.level = "Winner";
		player.wins += 1;
	}
	Players.update(
		  {
			_id: Players.findOne({name: player.name})['_id']
		  },
		  {$set:
			  {
				  level: player.level,
				  wins: player.wins
			  }
			  
			
		  }
		);
  },
  
	
 'click #level-down-button'(event){
    event.preventDefault();
	if( player.level > 0 && player.level != "Winner"){
		player.level -= 1;
	}
    Players.update(
      {
        _id: Players.findOne({name: player.name})['_id']
      },
      {$set:
			  {
				level: player.level,
			  }
	  }
    );
  },

  'click #down-button'(event){
    event.preventDefault();

    if(player.worth-- == 1){
      if(player.glass == 2){
        if(player.worth_level != MAX_WORTH){
		  player.next_worth  += WORTH_INCREMENT;
          player.worth_level = player.next_worth;  
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
      {$set:
			  {
				worth: player.worth,
				worth_level: player.worth_level,
				next_worth: player.next_worth,
				glass: player.glass,
				total_drinks: player.total_drinks + 1,
				all_time_drinks: player.all_time_drinks + 1,
				level_name: LEVEL_NAMES[(player.worth_level/5)-2]
			  }
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
      {$set:
			  {
				level: 0,
				worth: player.worth,
				worth_level: player.worth_level,
				next_worth: player.next_worth,
				glass: player.glass,
				total_drinks : 0,
				level_name: LEVEL_NAMES[0]
			  }
      }
    );
	} else {
        alert("You boosted bastard!");
    }
  }
});
