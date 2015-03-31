$(document).ready(function(){

   _.templateSettings = {
     interpolate: /\{\{(.+?)\}\}/g
   };

playa.createSongs = function(event){
  debugger
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    var urls = []
    var playlist_id = playa.currentPlaylist[0].attributes.id || playa.playlist_id
    var user_id = playa.currentUser.get("id");
    var input = $('input');

    $.each(input, function() {
      var val = $(this).val();
      urls.push(val);
    });

    for (var i = 0; i < urls.length; i++) {
      var url = urls[i]
      var song = new playa.Song({url: url, playlist_id: playlist_id, user_id: user_id})
      song.save().done(function(){
        playa.songs.add(song);
      });
    }
    playa.router.navigate("shareplaylist", true)
  }


  playa.playlists = new playa.Playlists();
  playa.songs = new playa.Songs();
  playa.playlistSongs = new playa.PlaylistSongs();
  playa.myplaylists = new playa.Myplaylists();
  playa.users = new playa.Users();
  playa.skips = new playa.Skips();





  // create new instance of the class
  playa.router = new playa.Router();
  Backbone.history.start();
});

  // playa.playlistSongs = new playa.Songs({playlist_url: 'hey-girl-you-rock'});
