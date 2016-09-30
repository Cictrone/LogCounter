Template.game.helpers({
  players(){
	  player = Players.findOne({username: Meteor.user().username});
	  if(player.game_id != 'null'){
		return Players.find({game_id : player.game_id}).fetch();
	}
  },
  player(){return Players.findOne({username: Meteor.user().username});},
  game(){return Session.get("game");},
  scaler(){return 1-((Session.get("game").numPlayers)*.05);},
  isPlayer(p){return Session.get("player").username == p;},
  isMiddle(i){return (i+1 == Session.get("game").numPlayers/2) || (i+1 == (Session.get("game").numPlayers+1)/2);},
  isInGame(){
    return Players.findOne({username: Meteor.user().username}).game_id != "null";
  }
});

Template.game.events({
  'click #changename':function(event){
    event.preventDefault();
    player = Players.findOne({username: Meteor.user().username})['username'];
    game = Games.findOne({player_list: player});
    let name = prompt("New Game name: ");
    if(game){
      Games.update(
        {_id: game._id},
        {$set: {lobbyname : name}}
      )
    }
    game = Games.findOne({player_list: player});
    Session.set("game",game);
  },
	'click #newgame': function(event){
    event.preventDefault();
    player = Players.findOne({username: Meteor.user().username})['username'];
		game = Games.findOne({player_list: player});
		if(game){
			Games.update(
				{_id: game._id},
				{$pull: {player_list : player},
				 $inc : {numPlayers  : -1}}
			)
    }
		Games.insert({
      lobbyname: "DRUNK QUEST!!!",
		  numPlayers: 1,
		  player_list: [player],
		  finished: 0,
		  winner: "",
		}),
		Players.update(
			{_id: Players.findOne({username: player})['_id']},
			{$set:{game_id: (Games.findOne({player_list: player}))['_id']}}
		)
    game = Games.findOne({player_list: player});
    Session.set("game",game);
  },
	'submit form': function(event) {
        event.preventDefault();
        var gameIDVar = event.target.gameID.value;
		player = Players.findOne({username: Meteor.user().username});
		game = Games.findOne({player_list: player.username});
		if(game){
		Games.update(
			{_id: game._id},
			{$pull: {player_list : player.username},
			 $inc : {numPlayers  : -1}}
		),
	    game = Games.findOne({_id: gameIDVar});
		Games.update(
			{_id: game._id},
			{$push: {player_list : player.username},
			 $inc : {numPlayers  : 1}}
		)

		Players.update(
			{_id: Players.findOne({username: player.username})['_id']},
			{$set:{game_id: (Games.findOne({player_list: player.username}))['_id']}}
		)
		}
    game = Games.findOne({player_list: player});
    Session.set("game",game);
    }
});
