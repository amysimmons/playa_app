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
      var contributors = $.get('/playlist_contributor_count').done(function(){
        
        playa.currentPlaylistContributors = contributors.responseText
        // debugger 
      });
        
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

      var playlistStatsOptions = {
          playlistInfo: playa.currentPlaylist,
          contributor_count: playa.currentPlaylistContributors

      }
    
      var playlistStatsViewTemplate = $('#playlistStatsView-template').html();
      var playlistStatsViewHTML = _.template(playlistStatsViewTemplate);
      $('.playlist-stats-container').html(playlistStatsViewHTML(playlistStatsOptions));

      var playerViewTemplate = $('#playerView-template').html();
      var playerViewHTML = _.template(playerViewTemplate);
      $('.playler-container').html(playerViewHTML);

       var songStatsOptions = {
          // song_info: playa.songs.toJSON()[i],
          // image: playa.songs.toJSON()[i],
          // artist: playa.songs.toJSON()[i]
        }

      var songStatsViewTemplate = $('#songStatsView-template').html();
      var songStatsViewHTML = _.template(songStatsViewTemplate);
      $('.song-stats-container').html(songStatsViewHTML(songStatsOptions));     

      playa.songs.fetch().done(function(){
      
        var songs = playa.songs.toJSON();
        for (var i = 0; i < songs.length; i++) {

          // only show songs on page if the playlist id of the song matches 
          // the id of the current playlist on the page
          var song_playlist_id = playa.songs.models[i].attributes.playlist_id;
          var this_playist_id = playa.currentPlaylist[0].id;
          // debugger
          if(song_playlist_id === this_playist_id){
            var songViewOptions = {
              song_info: playa.songs.toJSON()[i]
            }
            song = songs[i];
            var song_div = $('<div></div>');
            var songViewTemplate = $('#songView-template').html();
            var songViewHTML = _.template(songViewTemplate);
            song_div.html(songViewHTML(songViewOptions));
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





