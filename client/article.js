Template.articles.helpers({
  player(){return Players.findOne({name: Meteor.user().username});},
  articles(){return Articles.find({}).fetch();}
});

Template.articles.events({
	'submit form': function(event) {
    event.preventDefault();
    let text = event.target.article_text.value;
    alert(Meteor.runCommand({callStats : Articles})['count']);
		Articles.insert({
				_id: meteor.runCommand({callStats : Articles})['count'],
        name: "hello"
    })
  }
});
