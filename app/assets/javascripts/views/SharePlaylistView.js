var playa = playa || {};
playa.SharePlaylistView = Backbone.View.extend({

  el: '#main',
  events: {
    // "click .go-to-playlist": 'goToPlaylist'
  },

  render: function() {
    console.log('showing new playlist form')

    var options = {
      playlist: playa.playlists.get(playa.playlist_id).toJSON(),
      user: playa.currentUser.toJSON()
    }

    var sharePlaylistViewTemplate = $('#sharePlaylistView-template').html();
    var sharePlaylistViewHTML = _.template(sharePlaylistViewTemplate);
    this.$el.html(sharePlaylistViewHTML(options));
  }

});