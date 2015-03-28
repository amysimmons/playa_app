var playa = playa || {};
playa.SharePlaylistView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .go-to-playlist": 'goToPlaylist'
  },

  render: function() {
    console.log('showing new playlist form')

    var playlistURL = playa.playlistURL;

    var sharePlaylistViewTemplate = $('#sharePlaylistView-template').html();
    var sharePlaylistViewHTML = _.template(sharePlaylistViewTemplate);
    this.$el.html(sharePlaylistViewHTML);
  },

  goToPlaylist: function(event){
    event.preventDefault();

    //   showSeats: function(result) {
    // var id = result.currentTarget.id;

    id = 81
    playa.router.navigate('playlists/' + id, true);



  }

});