var playa = playa || {};
playa.AddSongsView = Backbone.View.extend({

  el: '#main',
  events: {
    // "click .log-in-btn": 'userLogIn'
  },

  render: function() {
    console.log('showing new songs view')

    var addSongsViewTemplate = $('#addSongsView-template').html();
    var addSongsViewHTML = _.template(addSongsViewTemplate);
    this.$el.html(addSongsViewHTML);
  }

});