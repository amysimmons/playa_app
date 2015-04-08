$(document).ready(function(){

   _.templateSettings = {
     interpolate: /\{\{(.+?)\}\}/g
   };

playa.createSongs = function(event, playlist_id, isOwnerOfPlaylist){

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    var urls = [];
    var playlist_id = playlist_id || playa.currentPlaylist[0].attributes.id;
    var user_id = playa.currentUser.get("id");
    var input = $('input');

    // grab the url inputs and push them into the urls array
    $.each(input, function() {
      var val = $(this).val();
      urls.push(val);
    });

    // create a new song for each url
    for (var i = 0; i < urls.length; i++) {
      var url = urls[i];
      var song = new playa.Song({url: url, playlist_id: playlist_id, user_id: user_id});
      song.save().done(function(){
        playa.songs.add(song);
      });
    }

    // if the current user created the playlist, navigate to share playlist page
    if ( playa.creatorName.toLowerCase() === playa.currentUser.get("username").toLowerCase() ) {
      playa.router.navigate("shareplaylist", true);
    }else {
      // show playlist view depending on whether the user is creator or guest of the playlist
      var isOwnerOfPlaylist = $.get('/is_playlist_owner', { playlist_url: playa.playlist_url }).done(function(response){
        playa.playlistView.showView(isOwnerOfPlaylist);
      });

    }

  }

  // creating my collections
  playa.playlists = new playa.Playlists();
  playa.songs = new playa.Songs();
  playa.playlistSongs = new playa.PlaylistSongs();
  playa.playlistSongsBackBone = playa.playlistSongs;
  playa.myplaylists = new playa.Myplaylists();
  playa.users = new playa.Users();
  playa.skips = new playa.Skips();

  // create new instance of the class
  playa.router = new playa.Router();
  Backbone.history.start();
});
