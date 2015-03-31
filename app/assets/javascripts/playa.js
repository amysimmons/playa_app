$(document).ready(function(){

   _.templateSettings = {
     interpolate: /\{\{(.+?)\}\}/g
   };

// debugger;

  playa.playlists = new playa.Playlists();
  playa.songs = new playa.Songs();

  // playa.playlistSongs = new playa.Songs({playlist_url: 'hey-girl-you-rock'});

  playa.playlistSongs = new playa.PlaylistSongs();


  playa.myplaylists = new playa.Myplaylists();
  playa.users = new playa.Users();
  playa.skips = new playa.Skips();

  // create new instance of the class
  playa.router = new playa.Router();
  Backbone.history.start();
});