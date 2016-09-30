Template.playerCard.helpers({
  cardClass(){
    if(Meteor.user()){
      return "ui centered card";
    }
    return "card";
  },
  profilePic(){
    let _user = Meteor.users.findOne({'username': this.username});
    return Images.findOne({'_id': _user.profile.image});
  },
  hasProfilePic(){
    let _user = Meteor.users.findOne({'username': this.username});
    if(_user.profile){
      return true;
    }
    return false;
  }
});

Template.playerCard.events({
   'change #myPicInput'(event){
      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function (err, fileObj) {
          if (err){
             // handle error
          } else {
            var userId = Meteor.userId();
            var imagesURL = {
              "profile.image": fileObj._id
            };
            // should delete old image
            Meteor.users.update(userId, {$set: imagesURL});
          }
        });
     });
   },
   'click #changePic'(event){
     if(Meteor.userId()){
       $('#myPicInput').click();
     }
   }
});

Template.playerCard_buttons.helpers({
  player(){return Players.findOne({username: Meteor.user().username});}
});

Template.playerCard_buttons.events({

 'click #level-up-button'(event){
    event.preventDefault();
    if(!Session.get("game").finished){
    	if( player.level < 9 && player.level != "Winner"){
        Players.update(
          {_id: Players.findOne({username: player.username})['_id'] },
          {$inc:{level: 1}}
        );
      }else if(player.level == 9){
    		player.level = "Winner";
        Players.update(
          {_id: Players.findOne({username: player.username})['_id'] },
          {$inc:{wins: 1,all_time_drinks: player.total_drinks},
           $set:{level: player.level}}
        );
        Games.update(
          {_id: Session.get("game")._id},
          {$set:{finished: 1,winner:player.username}}
        );
    	}}
  },
 'click #level-down-button'(event){
    event.preventDefault();
    if(!Session.get("game").finished){
    	if( player.level > 0 && player.level != "Winner"){
        Players.update(
          {_id: Players.findOne({username: player.username})['_id']},
          {$inc:{level: -1}}
        );}
    }
  },
  'click #down-button'(event){
    event.preventDefault();
    if(!Session.get("game").finished){

    if(player.worth-- == 1){
      if(player.glass == 2){
        if(player.worth_level != MAX_WORTH){
		  player.next_worth  += WORTH_INCREMENT;
          player.worth_level = player.next_worth;
          player.glass = 1;
        }
        else{player.glass += 1;}
      }
      else{
        player.glass += 1;
      }
	  player.worth = player.worth_level;
    }
    if(player.game_id != 0) {player.all_time_drink+=1;}
    Players.update(
      {
        _id: Players.findOne({username: player.username})['_id']
      },
      {$set:
			  {
				worth: player.worth,
				worth_level: player.worth_level,
				next_worth: player.next_worth,
				glass: player.glass,
				total_drinks: player.total_drinks + 1,
				all_time_drinks: player.all_time_drinks,
				level_name: LEVEL_NAMES[(player.worth_level/5)-2]
			  }
      }
    );}
  },
  'click #reset-button'(event){
    event.preventDefault();
	if (confirm("Did you accidently press reset again Ryan?") == true) {
    Players.update(
      {_id: Players.findOne({username: player.username})['_id']},
      {$set:{
				level: 0,
				worth: START_WORTH,
				worth_level: START_WORTH,
				next_worth: START_WORTHh,
				glass: 1,
				total_drinks : 0,
				level_name: LEVEL_NAMES[0]
			}}
    );
	} else {
        alert("You boosted bastard!");
    }
  }
  });
