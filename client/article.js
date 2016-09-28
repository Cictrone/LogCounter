Template.article_details.helpers({
  player(){return Players.findOne({username: Meteor.user().username});},
  articles(){return Articles.find({}).fetch();},
  article(){return Session.get('article');
}
  });
Template.article_details.events({
});

Template.articles.helpers({
  player(){return Players.findOne({username: Meteor.user().username});},
  articles(){return Articles.find({}).fetch();},
  has_voted(id){return Articles.findOne({_id : id}).voted.includes(Players.findOne({username:Meteor.user().username}).username);}
});

Template.articles.events({
  'submit #viewArticle': function(event){
    event.preventDefault();
    let id = event.target.articleID.value;
    Session.set('prompt', 'article_details');
    Session.set('article', Articles.findOne({_id : id}));
  },
	'submit #new_article': function(event) {
    event.preventDefault();
    let text = event.target.article_text.value;
    let id = Mongo.ObjectID();
		Articles.update(
        {_id : id},
        {$set:{
          number: Articles.find({}).count() + 1,
          paragraph: [{line:[{text: text,num:1}],num:1}],
          is_approved: 0,
          yes_votes: 0,
          no_votes: 0,
          voted: []
        }},
        {upsert: 'true'}
      );
    },
    'submit #vote_yes': function(event){
      event.preventDefault();
      id = event.target.articleID.value;
      article =  Articles.findOne({_id : id});
      player = Players.findOne({username: Meteor.user().username});
      is_approved =0;
      if(article.yes_votes+1 > (Players.find({}).count()/2)){
        is_approved = 1;
      }
      if(!article.voted.includes(player.username) ){
        Articles.update(
          {_id : id},
          {$set:{
            is_approved: is_approved,
            yes_votes: article.yes_votes+1,
          },
          $push: {voted : player.username}
          });
        toastr.success("You have voted AYE!","");
      }else{toastr.error("You have already Voted on This.","");}
    },
    'submit #vote_no': function(event){
      event.preventDefault();
      id = event.target.articleID.value;
      article =  Articles.findOne({_id : id});
      player = Players.findOne({username: Meteor.user().username});
      if(!article.voted.includes(player.username) ){
        if(article.no_votes + 1 > (Players.find({}).count()/2)){
          Articles.remove({_id : id});
        }else{
          Articles.update(
            {_id : id},
            {$set:{
              no_votes: article.no_votes+1,
            },
            $push: {voted : player.username}});
        }
        toastr.success("You have voted NAY!","");
      }else{toastr.error("You have already Voted on This.","");}
    }
});
