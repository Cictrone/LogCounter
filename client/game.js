Template.game.helpers({
  players(){
	  player = Players.findOne({name: Meteor.user().username});
	  if(player.game_id != 'null'){   
		return Players.find({game_id : player.game_id}).fetch();
	}
  },
  player(){return Players.findOne({name: Meteor.user().username});},
  game(){
	  return Games.findOne({_id : player.game_id});
	}
});

Template.game.events({
	'click #newgame': function(event){
        event.preventDefault();	
		game = Games.findOne({player_list: player.name});
		player = Players.findOne({name: Meteor.user().username})['name'];
		if(game){
			Games.update(
				{_id: game._id},
				{$pull: {player_list : player}},
				{$inc : {numPlayers  : -1}}
			)
		}
		Games.insert(
		  {
			  numPlayers: 1,
			  player_list: [player],
			  finished: 0,
			  winner: "",
		  }
		),
		
		Players.update(
			{_id: Players.findOne({name: player})['_id']},
			{$set:{game_id: (Games.findOne({player_list: player}))['_id']}}
		)
	},
	'submit form': function(event) {
        event.preventDefault();
        var gameIDVar = event.target.gameID.value;
		player = Players.findOne({name: Meteor.user().username});
		game = Games.findOne({player_list: player.name});
		if(game){
		Games.update(
			{_id: game._id},
			{$pull: {player_list : player.name}},
			{$inc : {numPlayers  : game.numPlayers-1}}
		),
	    game = Games.findOne({_id: gameIDVar});
		Games.update(
			{_id: game._id},
			{$push: {player_list : player.name}},
			{$inc : {numPlayers  : game.numPlayers+1}}
		)

		Players.update(
			{_id: Players.findOne({name: player.name})['_id']},
			{$set:{game_id: (Games.findOne({player_list: player.name}))['_id']}}
		)
		}
    }
});

