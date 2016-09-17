Template.articles.helpers({
  player(){return Players.findOne({name: Meteor.user().username});},
  articles(){return Articles.find({}).fetch();}
});

Template.articles.events({
	'submit form': function(event) {
        event.preventDefault();

        var text = event.target.gameID.value;
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
