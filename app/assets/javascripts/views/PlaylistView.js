var playa = playa || {};
playa.PlaylistView = Backbone.View.extend({

  el: '#main',
  events: {
    // "click .new-playlist-btn": 'createNewPlaylist'
  },

  render: function() {
    console.log('showingplaylist view!!!!')
    var a = $.get('/is_playlist_owner')
    // if user is logged in and user owns the playlist show the playlist owner view
    if(a.responseJSON === true){
      var playlistOwnerViewTemplate = $('#playlistOwnerView-template').html();
      var playlistOwnerViewHTML = _.template(playlistOwnerViewTemplate);
      this.$el.html(playlistOwnerViewHTML);
    // if no user is logged in or if the current user doesn't own the playlist, 
    // show the playlist gues view
    }else{
      var playlistGuestViewTemplate = $('#playlistGuestView-template').html();
      var playlistGuestViewHTML = _.template(playlistGuestViewTemplate);
      this.$el.html(playlistGuestViewHTML);
    }
  }
});

