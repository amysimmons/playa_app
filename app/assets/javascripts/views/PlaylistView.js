var playa = playa || {};
playa.PlaylistView = Backbone.View.extend({

  el: '#main',
  events: {
    // "click .new-playlist-btn": 'createNewPlaylist'
  },

  render: function() {
    view = this;
    console.log('showingplaylist view!!!!')

    // if user is logged in and user owns the playlist show the playlist owner view
    var isOwnerOfPlaylist = $.get('/is_playlist_owner').done(function(){
      // debugger

      view.showView(isOwnerOfPlaylist);

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

      var songViewTemplate = $('#songView-template').html();
      var songViewHTML = _.template(songViewTemplate);
      $('.songs-container').html(songViewHTML);

    // if no user is logged in or if the current user doesn't own the playlist, 
    // show the playlist gues view
    }else{
      var playlistGuestViewTemplate = $('#playlistGuestView-template').html();
      var playlistGuestViewHTML = _.template(playlistGuestViewTemplate);
      this.$el.html(playlistGuestViewHTML);
    }
  }
    
  // }
});

