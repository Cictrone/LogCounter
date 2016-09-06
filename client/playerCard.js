Template.playerCard.helpers({
  cardClass(){
    if(Meteor.user()){
      return "ui centered card";
    }
    return "card";
  },
  profilePic(){
    let _user = Meteor.users.findOne({'username': this.name});
    return Images.findOne({'_id': _user.profile.image});
  },
  hasProfilePic(){
    let _user = Meteor.users.findOne({'username': this.name});
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
            Meteor.users.update(userId, {$set: imagesURL});
          }
        });
     });
   },
   'click #changePic'(event){
     $('#myPicInput').click();
   }
});
