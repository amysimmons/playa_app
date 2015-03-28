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
    var user_id = playa.currentUser.get("id")
    var name = $('#name').val();
    var song_limit = $('#song-limit').val();
    var playlist = new playa.Playlist({name: name, song_limit: song_limit, user_id: user_id})

    playlist.save();
    playa.playlists.add(playlist);
    playa.playlists.fetch();

    debugger;
      // save id in variable here


    // var userContent = this.$('textarea').val();
    // var secret = new whisper.Secret({content: userContent})


    // secret.save();
    // whisper.secrets.add(secret);

    // this.$('textarea').val('');

    // var secretsView = new whisper.SecretsView({collection: whisper.secrets});
    // secretsView.render();


    playa.router.navigate("addsongs", true)  

  }

});