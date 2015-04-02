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
