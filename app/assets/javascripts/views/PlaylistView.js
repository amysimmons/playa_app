var playa = playa || {};
playa.PlaylistView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .shuffle": 'shuffleSongs',
    "click .skip-btn": 'createOrDeleteSkip',
    'click .add-songs-btn': function (event) {
      playa.createSongs(event);
    }
  },

  render: function(name, url) {
    view = this;

    playa.playlists.fetch().done(function(){

      playa.currentPlaylist = playa.playlists.where({playlist_url: url});
      playa.creatorName = name
      playa.currentSongChosenBy = playa.currentPlaylist[0].attributes.user_id
      playa.playlist_url = url

      var contributors = $.get('/playlist_contributor_count').done(function(){ 
        playa.currentPlaylistContributors = contributors.responseText;
      }).done(function(){

        // if user is logged in and user owns the playlist show the playlist owner view
        var isOwnerOfPlaylist = $.get('/is_playlist_owner', { playlist_url: playa.playlist_url }).done(function(response){
          // debugger;
          view.showView(isOwnerOfPlaylist);
        });

      });

    });
  },

  showView: function(isOwnerOfPlaylist){
    // debugger;
    if(isOwnerOfPlaylist.responseJSON === true){

      // overall owner view template
      var playlistOwnerViewTemplate = $('#playlistOwnerView-template').html();
      var playlistOwnerViewHTML = _.template(playlistOwnerViewTemplate);
      this.$el.html(playlistOwnerViewHTML);

      // playlist stats view
      var playlistStatsOptions = {
        contributor_count: playa.currentPlaylistContributors,
        creator_name: playa.creatorName
      }

      var playlistStatsViewTemplate = $('#playlistStatsView-template').html();
      var playlistStatsViewHTML = _.template(playlistStatsViewTemplate);
      $('.playlist-stats-container').html(playlistStatsViewHTML(playlistStatsOptions));


        // show the playlist songs on the page
        var playlistSongs = $.get('/playlists/' + playa.playlist_url + '/songs').done(function(){

        playa.playlistSongs = playlistSongs.responseJSON;
      
      }).done(function(){

        playa.currentSong = playa.playlistSongs[0].iframe

        //render player view to show the first song in the shuffled song array
        var playerOptions = {
          playlist_name: playa.currentPlaylist[0].attributes.name,
          creator_name: playa.creatorName,
          playlist_url: playa.playlist_url,
          iframe: playa.currentSong
        }
     
        var playerViewTemplate = $('#playerView-template').html();
        var playerViewHTML = _.template(playerViewTemplate);
        $('.player-container').html(playerViewHTML(playerOptions));

        // get songs for current playlist
        var songs = playa.playlistSongs;

        playa.skips.fetch().done(function () {
          $('.songs-container').html('')
          for (var i = 0; i < songs.length; i++) {
            var song = songs[i];

            // for each song grab the song id and check whether 
            // the current user's skips include that song id

            var skipped = "skip";
            if ( playa.skips.where({ song_id: song.id }).length != 0 ) {
              skipped = "unskip";
            }

            var songViewOptions = {
              song_info: song,
              skipped: skipped
            }

            var song_div = $('<div data-id=' + song.id + '></div>');
            var songViewTemplate = $('#songView-template').html();
            var songViewHTML = _.template(songViewTemplate);
            song_div.html(songViewHTML(songViewOptions));
            song_div.appendTo($('.songs-container'));

          }
        });

      // song stats view
      var songChosenByName = $.get('/current_song_chosen_by').done(function(){
        playa.currentSongByName = songChosenByName.responseText;
      });

       var songStatsOptions = {
        song_chosen_by: playa.currentSongByName
        }

        var songStatsViewTemplate = $('#songStatsView-template').html();
        var songStatsViewHTML = _.template(songStatsViewTemplate);
        $('.song-stats-container').html(songStatsViewHTML(songStatsOptions));     

      });

    } else {

      // render the guest view template 
      var playlistGuestViewTemplate = $('#playlistGuestView-template').html();
      var playlistGuestViewHTML = _.template(playlistGuestViewTemplate);
      this.$el.html(playlistGuestViewHTML);

      // render the add songs form
      var addSongsViewTemplate = $('#addSongsView-template').html();
      var addSongsViewHTML = _.template(addSongsViewTemplate);
      $('.guest-add-songs-container').html(addSongsViewHTML);

      // // render playlist songs guest view
      // var addSongsViewTemplate = $('#addSongsView-template').html();
      // var addSongsViewHTML = _.template(addSongsViewTemplate);
      // $('.guest-vote-container').html(addSongsViewHTML);

      // SONGS GUEST VIEW 
      var playlistSongs = $.get('/playlists/' + playa.playlist_url + '/songs').done(function(){
        playa.playlistSongs = playlistSongs.responseJSON;
      }).done(function(){

        // get songs for current playlist
        var songs = playa.playlistSongs;

        playa.skips.fetch().done(function(){
          $('.guest-vote-container').html('')
          for (var i = 0; i < songs.length; i++) {
            var song = songs[i];
            // for each song grab the song id and check whether 
            // the current user's skips include that song id
            var skipped = "skip";
            if ( playa.skips.where({ song_id: song.id }).length != 0 ) {
              skipped = "unskip";
            }
            var songViewOptions = {
              song_info: song,
              skipped: skipped
            }
            // console.log(song);
            var song_div = $('<div data-id=' + song.id + '></div>');
            var songViewTemplate = $('#songView-template').html();
            var songViewHTML = _.template(songViewTemplate);
            song_div.html(songViewHTML(songViewOptions));
            song_div.appendTo($('.guest-vote-container'));
          }
        });
      });
    }
  },

  shuffleSongs: function(event){
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    console.log('shuffling');
    playa.router.playlist();
    // playa.showView();

    // debugger
    // run this on shuffle button click
    // playa.playlistSongs.reset( playa.playlistSongs.shuffle(), {silent: true} );

  },

  createOrDeleteSkip: function(event){
    var currentElement = $(event.currentTarget);
    event.preventDefault();
    // debugger;
    // console.log('skipping or unskipping');

    // if button has class of skipped
    // post request 

    // elsif has class unskipping
      // delete post request 

    var user_id = playa.currentUser.id;
    var song_id = $(event.currentTarget).parent().parent().data("id");
    // debugger;

    if ( $(event.currentTarget).hasClass("skip") ) {
      // console.log("It had the class skip, save it.");
      // debugger;
      var skip = new playa.Skip({ user_id: user_id, song_id: song_id })
      skip.save().done(function(){
        // debugger;
        // Change the text to "Unskip"
        // Remove the class skip and add unskip
        // debugger;

        currentElement.text("Vote to unskip");
        currentElement.removeClass("skip").addClass("unskip");

        // debugger;
        // get skip id and add id to skip
        playa.skips.add(skip);
        playa.skips.fetch();
        // console.log("Yep, that save worked.");
      });
    } else {
      $.ajax("/skips", {
        type: "DELETE",
        data: {
          _method: "DELETE",
          user_id: user_id,
          song_id: song_id
        },
        success: function (response) {
          currentElement.text("Vote to skip");
          currentElement.removeClass("unskip").addClass("skip");
        }
      })
    }
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




