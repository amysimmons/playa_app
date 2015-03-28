var playa = playa || {};
playa.NewPlaylistView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .new-playlist-btn": 'createNewPlaylist'
  },

  render: function() {
    console.log('showing new playlist form')
    var newPlaylistViewTemplate = $('#newPlaylistView-template').html();
    var newPlaylistViewHTML = _.template(newPlaylistViewTemplate);
    this.$el.html(newPlaylistViewHTML);
  },

  createNewPlaylist: function(event){
    event.preventDefault();
    var name = $('#name').val();
    var song_limit = $('#song-limit').val();
    var playlist = new playa.Playlist({name: name, song_limit: song_limit})
    playlist.save();

    playa.router.navigate("addsongs", true)  

  }

});