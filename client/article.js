Template.articles.helpers({
  player(){return Players.findOne({name: Meteor.user().username});},
  articles(){return Articles.find({}).fetch();}
});

Template.articles.events({
	'submit #new_article': function(event) {
    event.preventDefault();
    let text = event.target.article_text.value;
    let id = Mongo.ObjectID();
		Articles.update(
        {_id : id},
        {$set:{
          number: Articles.find({}).count() + 1,
          paragraph: 1,
          line: 1,
          text: text,
          is_approved: 0,
          yes_votes: 0,
          no_votes: 0,
          voted: []
        }},
        {upsert: 'true'}
      );
    },
    'submit #vote_yes': function(event){
      id = event.target.articleID.value;
      article =  Articles.findOne({_id : id});
      player = Players.findOne({name: Meteor.user().username});
      is_approved =0;
      if(article.yes_votes > (Players.find({}).count()/2)){
        is_approved = 1;
      }
      alert(player.name);alert( article.yes_votes);
      alert(article.voted);
      if(!Articles.findOne({voted : player.name}) ){
        Articles.update(
          {_id : id},
          {$set:{
            is_approved: is_approved,
            yes_votes: article.yes_votes+1,
          },
          $push: {voted : player.name}
          });
          toastr.success("You have voted AYE!");
      }else{toastr.error("You have already Voted on This.");}
    },
    'click #no': function(event){
      Articles.update(
          {_id : id},
          {$set:{
            number: Articles.find({}).count() + 1,
            paragraph: 1,
            line: 1,
            text: text,
            is_approved: 0,
            yes_votes: 0,
            no_votes: 0,
            voted: []
          }},
          {upsert: 'true'}
        );
    }
});
