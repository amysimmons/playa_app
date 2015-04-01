$(document).ready(function(){

   _.templateSettings = {
     interpolate: /\{\{(.+?)\}\}/g
   };

playa.createSongs = function(event, playlist_id, isOwnerOfPlaylist){

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    var urls = []
    var playlist_id = playlist_id || playa.currentPlaylist[0].attributes.id

    // debugger
    // playa.currentPlaylist[0].attributes.id || playa.playlist_id
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
    // if(isOwnerOfPlaylist.responseJSON === true){
    if ( playa.creatorName.toLowerCase() === playa.currentUser.get("username").toLowerCase() ) {
      playa.router.navigate("shareplaylist", true)
      console.log('in playa creator view')
    }else {

      var isOwnerOfPlaylist = $.get('/is_playlist_owner', { playlist_url: playa.playlist_url }).done(function(response){
        // debugger;
        playa.playlistView.showView(isOwnerOfPlaylist);
        console.log('in playa guest view')
      });

    }
    // }

  }

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

  // playa.playlistSongs = new playa.Songs({playlist_url: 'hey-girl-you-rock'});
