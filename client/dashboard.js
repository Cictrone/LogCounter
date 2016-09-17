
Template.article_dash.helpers({
  player(){return Players.findOne({name: Meteor.user().username});},
  articles(){return Articles.find({}).fetch();}
});
Template.article_dash.events({
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

Template.gamesSummary.helpers({
  games(){return Games.find({}).fetch();},
  player(){return Players.findOne({name: Meteor.user().username});}
});
Template.gamesSummary.events({
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
    },
});

Template.playerSummary.helpers({
  players(){return Players.find({}).fetch();},
  player(){return Players.findOne({name: Meteor.user().username});}

});
Template.playerSummary.events({
});

 
Template.dashboard.helpers({
  player(){return Players.findOne({name: Meteor.user().username});}
});
Template.dashboard.events({
});

Template.game_dash.events({
  player(){return Players.findOne({name: Meteor.user().username});}  
});
Template.game_dash.helpers({
  player(){
    player = Players.findOne({name: Meteor.user().username});
    if (player){return player;}
}});

