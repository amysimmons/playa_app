$(document).ready(function(){

   _.templateSettings = {
     interpolate: /\{\{(.+?)\}\}/g
   };

  playa.playlists = new playa.Playlists();
  playa.songs = new playa.Songs();
  playa.myplaylists = new playa.Myplaylists();

  // create new instance of the class
  playa.router = new playa.Router();
  Backbone.history.start();
});