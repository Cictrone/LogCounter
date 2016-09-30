Template.gamesSummary.helpers({
  //games(){return Games.find({_id: {$ne: 'null'}}).fetch();},
  games(){return Games.find({}).fetch();},
  player(){return Players.findOne({username: Meteor.user().username});},
});
Template.gamesSummary.events({
	'submit form': function(event) {
    event.preventDefault();
    var gameIDVar = event.target.gameID.value;
		player = Players.findOne({username: Meteor.user().username});
  if( !Games.findOne({_id: gameIDVar}).finished || Games.findOne({_id: gameIDVar})._id == 'null'){
		Games.update(
			{_id: Games.findOne({player_list: player.username})._id},
			{$pull: {player_list : player.username},
			 $inc : {numPlayers  : -1}}
		),
		Games.update(
			{_id: Games.findOne({_id: gameIDVar})._id},
			{$push: {player_list : player.username},
			 $inc : {numPlayers  : 1}}
		),
		Players.update(
			{_id: player._id},
			{$set:{
        game_id: Games.findOne({player_list: player.username})._id,
        level: 0,
        worth: START_WORTH,
        worth_level: START_WORTH,
        next_worth: START_WORTH,
        glass: 1,
        total_drinks : 0,
        level_name: LEVEL_NAMES[0]}}
		);
    game = Games.findOne({player_list: player.username});
    Session.set("game",game);
  }}
});

Template.playerSummary.helpers({
  players(){return Players.find({_id: {$ne: 'null'}}).fetch();},
  player(){return Players.findOne({username: Meteor.user().username});}

});
Template.playerSummary.events({
});

Template.dashboard.helpers({
  player(){
    return Players.findOne({username: Meteor.user().username});
  }
});
Template.dashboard.events({
});

Template.game_dash.helpers({
  player(){return Players.findOne({username: Meteor.user().username});}
});
Template.game_dash.events({
});

Template.article_dash.helpers({
  player(){return Players.findOne({username: Meteor.user().username});},
});
Template.article_dash.events({
});
