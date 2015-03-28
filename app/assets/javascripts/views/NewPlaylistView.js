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
    var name = $('#name').val();
    var song_limit = $('#song-limit').val();
    var playlist = new playa.Playlist({name: name, song_limit: song_limit, user_id: user_id});
    // playlist.save();

    playlist.save().done(function(r){
        console.log(r);
        playa.playlists.add(playlist);
        playa.playlists.fetch().done(function(){
          var name = playlist.attributes.name;
          name = name.replace(/ /gi, "-");
          name = name.toLowerCase();
          playa.playlist_id = playlist.attributes.id;
          playa.playlistURL = 'playlists/'+name+'/'+playlist.attributes.id
          playa.router.navigate("addsongs", true) 
        });

    });

    // playa.playlists.add(playlist);
    // playa.playlists.fetch().done(function(playlists){
       
    //   playa.playlist_id = playlists[playlists.length - 1].id;
    //   playa.router.navigate("addsongs", true)  
    // });

  }

});