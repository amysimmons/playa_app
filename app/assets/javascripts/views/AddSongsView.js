var playa = playa || {};
playa.AddSongsView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .add-owner-songs-btn": function (event) {
      var playlist_id = playa.playlist_id;
      playa.createSongs(event, playlist_id);
      console.log('im handingline it from add songs');
    }
  },

  render: function() {
    console.log('showing new songs view')

    $('#main').empty();

    // renders form skeleton
    var addSongsViewTemplate = $('#addSongsView-template').html();
    var addSongsViewHTML = _.template(addSongsViewTemplate);
    this.$el.html(addSongsViewHTML);

    // renders the input a field specified number of times for the playlist
    _(playa.song_limit).times(function(){
      var addSongViewInputTemplate = $('#addSongInputView-template').html();
      var addSongViewInputHTML = _.template(addSongViewInputTemplate);
      $('.add-songs-form').prepend(addSongViewInputHTML);
    })

    // renders skip to share playlist view button
    var addSongSkipViewTemplate = $('#addSongSkipStepView-template').html();
    var addSongSkipViewHTML = _.template(addSongSkipViewTemplate);
    $('.add-songs-form').append(addSongSkipViewHTML);

    // adds heading to main
    $('.main-container').prepend('<p class="guest-add-songs-p">Submit your SoundCloud URLs below</p>').prepend('<h2 class="guest-add-songs-head">Step Two: Add Songs</h2>');

  }

});
