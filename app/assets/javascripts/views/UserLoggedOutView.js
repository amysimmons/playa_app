var playa = playa || {};
playa.UserLoggedOutView = Backbone.View.extend({

  el: '#header',
  events: {
    "click .my-playlists-btn": 'createPlaylist'
  },

  render: function() {
    console.log('showing user logged out view')
    var userLoggedOutViewTemplate = $('#userLoggedOutView-template').html();
    var userLoggedOutViewHTML = _.template(userLoggedOutViewTemplate);
    this.$el.html(userLoggedOutViewHTML);
  }

});
