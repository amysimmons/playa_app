var playa = playa || {};

playa.PlaylistSongs = Backbone.Collection.extend({
  url: function(){
    return '/playlists/' + playlist_url + '/songs';
  }, 

  model: playa.PlaylistSong,

  initialize: function(playlist_url){
    playa.playlist_url = playlist_url;
  }
});

// colleciton 
// // var app = app || {};

// // // this is really just part of our model, but is like a fancy array
// // // for storying a collection of models
// // // uses underscore.js to give us activerecordish methods like .get 
// // app.Comments = Backbone.Collection.extend({
// //   url: function(){
// //     return '/posts/' + this.postID + '/comments';
// //   },

// //   model: app.Comment,

// //   initialize: function(postID){
// //     this.postID = postID;
// //     this.on('add', function(comment){
// //       var commentView = new app.CommentView({model: comment});
// //       commentView.render();
// //       console.log('new comment added', comment);
// //     });
// //   }
// // });

// model
// // // this line says create a namespace for this if we dont already have one
// // var app = app || {};

// // // our models as per rails
// // // the defaults are similar to a schema
// // app.Comment = Backbone.Model.extend({
// //   urlRoot: function(){
// //     return '/posts/' + this.get('post_id') + '/comments';
// //   },

// //   defaults: {
// //     author: '',
// //     content: ''
// //   },
// //   initialize: function(postID) {
// //     this.postID = postID;
// //   }
// // });