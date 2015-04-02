var playa = playa || {};

playa.PlaylistSong = Backbone.Model.extend({

  urlRoot: function(){
     return '/playlists/' + playlist_url + '/songs';
  }, 
  initialize: function(playlist_url){
    playa.playlist_url = playlist_url;
  }

});