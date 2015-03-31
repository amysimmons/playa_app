var playa = playa || {};

playa.PlaylistSong = Backbone.Model.extend({

  urlRoot: function(){
     return '/playlists/' + playlist_url + '/songs';
  }, 
  initialize: function(playlist_url){
    playa.playlist_url = playlist_url;
  }

});



// // this line says create a namespace for this if we dont already have one
// var app = app || {};

// // our models as per rails
// // the defaults are similar to a schema
// app.Comment = Backbone.Model.extend({
//   urlRoot: function(){
//     return '/posts/' + this.get('post_id') + '/comments';
//   },

//   defaults: {
//     author: '',
//     content: ''
//   },
//   initialize: function(postID) {
//     this.postID = postID;
//   }
// });