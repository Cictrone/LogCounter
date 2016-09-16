Template.linkbar.events({
	'click #changeToDashboard': function(event){
		event.preventDefault();
		Session.set('prompt', 'dashboard');
	}, 
	'click #changeToSummary': function(event){
	  event.preventDefault();
	  Session.set('prompt', 'playerSummary');
	},
	'click #changeToGame': function(event){
		event.preventDefault();
		Session.set('prompt', 'game_dash');
	},
	'click #changeToGamesSummary': function(event){
		event.preventDefault();
		Session.set('prompt', 'gamesSummary');
	},	
	'click #changeToArticles': function(event){
		event.preventDefault();
		Session.set('prompt', 'article_dash');
	},
	'click #logout': function(event){
		event.preventDefault();
		Meteor.logout();
		Session.set('prompt', 'login');
	}	
});

