var playa = playa || {};
playa.PlaylistView = Backbone.View.extend({

  el: '#main',
  events: {
    // "click .new-playlist-btn": 'createNewPlaylist'
  },

  render: function(url) {
    view = this;
    console.log('showingplaylist view!!!!')

    playa.playlists.fetch().done(function(){


      playa.currentPlaylist = playa.playlists.where({playlist_url: url});
        // debugger
      // if user is logged in and user owns the playlist show the playlist owner view
      var isOwnerOfPlaylist = $.get('/is_playlist_owner').done(function(){
        // debugger
        view.showView(isOwnerOfPlaylist);
      });
    });
  },

  showView: function(isOwnerOfPlaylist){

    if(isOwnerOfPlaylist.responseJSON === true){

      var playlistOwnerViewTemplate = $('#playlistOwnerView-template').html();
      var playlistOwnerViewHTML = _.template(playlistOwnerViewTemplate);
      this.$el.html(playlistOwnerViewHTML);

      var playlistStatsViewTemplate = $('#playlistStatsView-template').html();
      var playlistStatsViewHTML = _.template(playlistStatsViewTemplate);
      $('.playlist-stats-container').html(playlistStatsViewHTML);

      var playerViewTemplate = $('#playerView-template').html();
      var playerViewHTML = _.template(playerViewTemplate);
      $('.playler-container').html(playerViewHTML);

      var songStatsViewTemplate = $('#songStatsView-template').html();
      var songStatsViewHTML = _.template(songStatsViewTemplate);
      $('.song-stats-container').html(songStatsViewHTML);     

      playa.songs.fetch().done(function(){
      
        var songs = playa.songs.toJSON();
        for (var i = 0; i < songs.length; i++) {

          // only show songs on page if the playlist id of the song matches 
          // the id of the current playlist on the page
          var song_playlist_id = playa.songs.models[i].attributes.playlist_id;
          var this_playist_id = playa.currentPlaylist[0].id;
          // debugger
          if(song_playlist_id === this_playist_id){
            console.log(i)
            var options = {
              // title 
              // image 
              // artist 
              // etc
            }
            song = songs[i];
            var song_div = $('<div></div>');
            var songViewTemplate = $('#songView-template').html();
            var songViewHTML = _.template(songViewTemplate);
            song_div.html(songViewHTML(options));
            song_div.appendTo($('.songs-container'));
          }
        };
      })

    // if no user is logged in or if the current user doesn't own the playlist, 
    // show the playlist gues view
    }else{
      var playlistGuestViewTemplate = $('#playlistGuestView-template').html();
      var playlistGuestViewHTML = _.template(playlistGuestViewTemplate);
      this.$el.html(playlistGuestViewHTML);
    }
  }
    
});


//   render: function() {

//     $('#main').empty();

//     console.log('showing my playlists')

//     var myPlaylistsViewTitleTemplate = $('#myPlaylistsViewTitle-template').html();
//     var myPlaylistsViewTitleHTML = _.template(myPlaylistsViewTitleTemplate);
//     this.$el.html(myPlaylistsViewTitleHTML);

//     var view = this

//     playa.myplaylists.fetch().done(function(){

//       var myplaylists = playa.myplaylists.toJSON();

//       for (var i = 0; i < myplaylists.length; i++) {
//         var options = {
//           playlist_url: playa.myplaylists.toJSON()[i],
//           user: playa.currentUser.toJSON()
//         }
//         var myplaylist = myplaylists[i];
//         var playlist_div = $('<div></div>');
//         var myPlaylistsViewTemplate = $('#myPlaylistsView-template').html();
//         var myPlaylistsViewHTML = _.template(myPlaylistsViewTemplate);
//         playlist_div.html(myPlaylistsViewHTML(options));
//         playlist_div.appendTo($('#main'));

//       };

//     });

//   }

// });





