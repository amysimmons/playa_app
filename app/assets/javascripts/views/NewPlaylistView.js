var playa = playa || {};
playa.NewPlaylistView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .new-playlist-btn": 'createNewPlaylist'
  },

  initialize : function(){
    console.log("initializing view");
    playa.playlists.on('add', this.render, this);
    playa.playlists.on('reset', this.render, this);
    this.render();
  },

  render: function() {
    console.log('showing new playlist form')
    var newPlaylistViewTemplate = $('#newPlaylistView-template').html();
    var newPlaylistViewHTML = _.template(newPlaylistViewTemplate);
    this.$el.html(newPlaylistViewHTML);
  },

  createNewPlaylist: function(event){
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    var user_id = playa.currentUser.get("id");
    var username = playa.currentUser.get("username").toLowerCase();
    var name = $('#name').val();
    var song_limit = $('#song-limit').val();
    var playlist = new playa.Playlist({name: name, song_limit: song_limit, user_id: user_id});

    playlist.save().done(function(r){
        console.log(r);
        playa.playlists.add(playlist);
        playa.playlists.fetch().done(function(){
          // username = username.toLowerCase();
          // username = username.replace(/ /gi, "-");
          // username = username.replace(/[^-A-Za-z0-9]+/g, '');
          var name = playlist.attributes.name;
          name = name.replace(/ /gi, "-");
          name = name.replace(/[^-A-Za-z0-9]+/g, '');
          name = name.toLowerCase();
          playa.playlist_id = playlist.attributes.id;
          playa.playlist_url = name;
          var playlist_url = playa.playlist_url;
          playlist.save({playlist_url: playlist_url}).done(function(r){
            console.log(r);
            playa.router.navigate("addsongs", true)
          });
        });
    });
    playa.song_limit = song_limit;
  }
});