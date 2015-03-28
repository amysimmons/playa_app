var playa = playa || {};
playa.MyPlaylistsView = Backbone.View.extend({

  el: '#main',
  events: {
    // "click .my-playlists-btn": 'createPlaylist'
  },

  render: function() {
    console.log('showing new playlist form')
    var myPlaylistsViewTemplate = $('#myPlaylistsView-template').html();
    var myPlaylistsViewHTML = _.template(myPlaylistsViewTemplate);
    this.$el.html(myPlaylistsViewHTML);
  }

});