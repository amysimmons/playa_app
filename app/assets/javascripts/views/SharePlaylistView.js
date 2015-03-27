var playa = playa || {};
playa.SharePlaylistView = Backbone.View.extend({

  el: '#main',
  events: {
    // "click .log-in-btn": 'userLogIn'
  },

  render: function() {
    console.log('showing new playlist form')

    var sharePlaylistViewTemplate = $('#sharePlaylistView-template').html();
    var sharePlaylistViewHTML = _.template(sharePlaylistViewTemplate);
    this.$el.html(sharePlaylistViewHTML);
  }

});