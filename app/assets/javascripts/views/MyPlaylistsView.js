var playa = playa || {};
playa.MyPlaylistsView = Backbone.View.extend({

  el: '#main',
  events: {
    // "click .my-playlists-btn": 'createPlaylist'
  },

  render: function() {

    $('#main').empty();

    console.log('showing my playlists')

    var myPlaylistsViewTitleTemplate = $('#myPlaylistsViewTitle-template').html();
    var myPlaylistsViewTitleHTML = _.template(myPlaylistsViewTitleTemplate);
    this.$el.html(myPlaylistsViewTitleHTML);

    var view = this

    playa.myplaylists.fetch().done(function(){

      var myplaylists = playa.myplaylists.toJSON();

      for (var i = 0; i < myplaylists.length; i++) {
        var myplaylist = myplaylists[i];
        var playlist_div = $('<div></div>')
        var myPlaylistsViewTemplate = $('#myPlaylistsView-template').html();
        var myPlaylistsViewHTML = _.template(myPlaylistsViewTemplate);
        playlist_div.html(myPlaylistsViewHTML(myplaylist));
        playlist_div.appendTo($('#main'));

      };

    });

  }

});
