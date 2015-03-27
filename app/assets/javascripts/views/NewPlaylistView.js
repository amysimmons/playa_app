var playa = playa || {};
playa.NewPlaylistView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .new-playlist-btn": 'createPlaylist'
  },

  render: function() {
    console.log('showing new playlist form')
    var newPlaylistViewTemplate = $('#newPlaylistView-template').html();
    var newPlaylistViewHTML = _.template(newPlaylistViewTemplate);
    this.$el.html(newPlaylistViewHTML);
  },

  createPlaylist: function(){

    var name = $('#name').val();

  }

});