$(document).ready(function(){

   _.templateSettings = {
     interpolate: /\{\{(.+?)\}\}/g
   };

  // create new instance of the class
  playa.router = new playa.Router();
  Backbone.history.start();

  playa.playlists = new playa.Playlists();
  playa.songs = new playa.Songs();
  playa.myplaylists = new playa.Myplaylists();

});