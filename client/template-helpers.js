
Template.registerHelper( 'usersPost', (currentPoster) => {
  return Meteor.userId() === currentPoster;
});