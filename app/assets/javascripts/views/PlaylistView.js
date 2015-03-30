var playa = playa || {};
playa.PlaylistView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .shuffle": 'shuffleSongs',
    "submit form": 'createNewSongSkip'
  },

  render: function(name, url) {
    view = this;
    console.log('showingplaylist view!!!!')

    playa.playlists.fetch().done(function(){

      playa.currentPlaylist = playa.playlists.where({playlist_url: url});
      playa.creatorName = name
      playa.currentSongChosenBy = playa.currentPlaylist[0].attributes.user_id
      playa.playlist_url = url

      // var songChosenBy = 

      var contributors = $.get('/playlist_contributor_count').done(function(){ 
        playa.currentPlaylistContributors = contributors.responseText;
      }).done(function(){

        // if user is logged in and user owns the playlist show the playlist owner view
        var isOwnerOfPlaylist = $.get('/is_playlist_owner').done(function(){
          view.showView(isOwnerOfPlaylist);
        });

      });

    });
  },

  showView: function(isOwnerOfPlaylist){

    if(isOwnerOfPlaylist.responseJSON === true){

      var playlistOwnerViewTemplate = $('#playlistOwnerView-template').html();
      var playlistOwnerViewHTML = _.template(playlistOwnerViewTemplate);
      this.$el.html(playlistOwnerViewHTML);

      var playlistStatsOptions = {
        playlist_name: playa.currentPlaylist[0].attributes.name,
        contributor_count: playa.currentPlaylistContributors,
        creator_name: playa.creatorName
       
      }

      var playlistStatsViewTemplate = $('#playlistStatsView-template').html();
      var playlistStatsViewHTML = _.template(playlistStatsViewTemplate);
      $('.playlist-stats-container').html(playlistStatsViewHTML(playlistStatsOptions));


      var playerOptions = {

        creator_name: playa.creatorName,
        playlist_url: playa.playlist_url
       
      }

      var playerViewTemplate = $('#playerView-template').html();
      var playerViewHTML = _.template(playerViewTemplate);
      $('.player-container').html(playerViewHTML(playerOptions));

       var songStatsOptions = {
          // song_info: playa.songs.toJSON()[i],
          // image: playa.songs.toJSON()[i],
          // artist: playa.songs.toJSON()[i]
        }

      var songStatsViewTemplate = $('#songStatsView-template').html();
      var songStatsViewHTML = _.template(songStatsViewTemplate);
      $('.song-stats-container').html(songStatsViewHTML(songStatsOptions));     

      playa.songs.fetch().done(function(){
      
        var songs = playa.songs.toJSON();
        for (var i = 0; i < songs.length; i++) {

          // only show songs on page if the playlist id of the song matches 
          // the id of the current playlist on the page
          var song_playlist_id = playa.songs.models[i].attributes.playlist_id;
          var this_playist_id = playa.currentPlaylist[0].id;
          // debugger
          if(song_playlist_id === this_playist_id){
            var songViewOptions = {
              song_info: playa.songs.toJSON()[i]
            }
            song = songs[i];
            var song_div = $('<div></div>');
            var songViewTemplate = $('#songView-template').html();
            var songViewHTML = _.template(songViewTemplate);
            song_div.html(songViewHTML(songViewOptions));
            song_div.appendTo($('.songs-container'));
          }
        };
      })

    // if no user is logged in or if the current user doesn't own the playlist, 
    // show the playlist gues view
    }else{
      var playlistGuestViewTemplate = $('#playlistGuestView-template').html();
      var playlistGuestViewHTML = _.template(playlistGuestViewTemplate);
      this.$el.html(playlistGuestViewHTML);
    }
  },

  shuffleSongs: function(event){
    event.preventDefault();
    console.log('shuffling');
  },

  createNewSongSkip: function(event){
    event.preventDefault();
    console.log('skipping');
    var user_id = playa.currentUser.id
    var song_id = 380;
    var is_skipped = true;
    var skip = new playa.Skip({user_id: user_id, song_id: song_id, is_skipped: is_skipped})
    skip.save().done(function(){
      playa.skips.add(skip);
    });
  }
});

//   createNewSecret: function(event){
//     event.preventDefault();
//     var userContent = this.$('textarea').val();
//     var secret = new whisper.Secret({content: userContent})


//     secret.save();
//     whisper.secrets.add(secret);

//     this.$('textarea').val('');

//     var secretsView = new whisper.SecretsView({collection: whisper.secrets});
//     secretsView.render();

//   },

  // createSongs: function(event){
  //   event.preventDefault();
  //   event.stopPropagation();
  //   event.stopImmediatePropagation();

  //   var urls = []
  //   var playlist_id = playa.playlist_id
  //   var user_id = playa.currentUser.get("id");
  //   var input = $('input');

  //   $.each(input, function() {
  //     var val = $(this).val();
  //     urls.push(val);
  //   });

  //   for (var i = 0; i < urls.length; i++) {
  //     var url = urls[i]
  //     var song = new playa.Song({url: url, playlist_id: playlist_id, user_id: user_id})
  //     song.save().done(function(){
  //       playa.songs.add(song);
  //     });
  //   }
  //   playa.router.navigate("shareplaylist", true)
  // }


// whisper.NewSecretView = Backbone.View.extend({
//   el:'#new-secret',
//   events: {
//     'submit form': 'createNewSecret',
//     'click button': 'stopPolling'
//   },
//   render: function(){
//     // make the view available
//     var html = $('#newSecretTemplate').html();
//     this.$el.html(html);
//   },
//   createNewSecret: function(event){
//     event.preventDefault();
//     var userContent = this.$('textarea').val();
//     var secret = new whisper.Secret({content: userContent})


//     secret.save();
//     whisper.secrets.add(secret);

//     this.$('textarea').val('');

//     var secretsView = new whisper.SecretsView({collection: whisper.secrets});
//     secretsView.render();

//   },
//   stopPolling: function(event){
//     event.preventDefault();
//     whisper.secrets.stop();
//   }

// });


// maybe i need to do somehitn glike this after i shuffle the songs?
//     var secretsView = new whisper.SecretsView({collection: whisper.secrets});
//     secretsView.render();




