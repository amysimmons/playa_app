var playa = playa || {};

playa.initWidget = function () {
  var widgetIframe = document.getElementsByTagName('iframe')[0];
  playa.widget = SC.Widget(widgetIframe);

  playa.widget.bind( SC.Widget.Events.READY, function () {
    console.log("Widget Ready.");
    playa.widget.play();   
  });

  playa.widget.bind(SC.Widget.Events.FINISH, function(player, data) {
    console.log('finished');
    playa.playlistView.playNextTrack();      
  });
},

playa.PlaylistView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .shuffle": 'shuffleSongs',
    "click .skip-btn": 'createOrDeleteSkip',
    'click .add-songs-btn': function (event) {
      playa.createSongs(event);
    }, 
    'mouseover .song-view': 'toggleInfo'
  },

  render: function(name, url) {
    view = this;

    playa.playlists.fetch().done(function(){
    console.log('setting creatorName');
      playa.currentPlaylist = playa.playlists.where({playlist_url: url});
      playa.creatorName = name
      playa.currentSongChosenBy = playa.currentPlaylist[0].attributes.user_id
      playa.playlist_url = url
      playa.playlist_id = playa.currentPlaylist[0].attributes.id

      // debugger
      var contributors = $.get('/'+playa.creatorName+'/'+playa.playlist_url+'/playlist_contributor_count').done(function(){ 
        playa.currentPlaylistContributors = contributors.responseText;
      }).done(function(){

        // if user is logged in and user owns the playlist show the playlist owner view
        $.get('/is_playlist_owner', { playlist_url: playa.playlist_url }).done(function(isOwnerOfPlaylist){
          // debugger;
          view.showView(isOwnerOfPlaylist);
        }); 

      });

    });

  },

  showView: function(isOwnerOfPlaylist){
    // debugger;
    if(isOwnerOfPlaylist === true){

      // overall owner view template
      var playlistOwnerViewTemplate = $('#playlistOwnerView-template').html();
      var playlistOwnerViewHTML = _.template(playlistOwnerViewTemplate);
      this.$el.html(playlistOwnerViewHTML);

      // playlist stats view
      var playlistStatsOptions = {
        contributor_count: playa.currentPlaylistContributors,
        creator_name: playa.creatorName
      }

      // var playlistStatsViewTemplate = $('#playlistStatsView-template').html();
      // var playlistStatsViewHTML = _.template(playlistStatsViewTemplate);
      // $('.playlist-stats-container').html(playlistStatsViewHTML(playlistStatsOptions));


        // show the playlist songs on the page
      var playlistSongs = $.get('/playlists/' + playa.playlist_url + '/songs').done(function(response){
        // debugger
        playa.playlistSongs = response;
       
        console.log('!!!', playa.playlistSongs[0]);
        playa.currentSong = playa.playlistSongs[0].iframe

        //render player view to show the first song in the shuffled song array
        var playerOptions = {
          playlist_name: playa.currentPlaylist[0].attributes.name,
          creator_name: playa.creatorName,
          playlist_url: playa.playlist_url,
          iframe: playa.currentSong,
          contributor_count: playa.currentPlaylistContributors
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

            var songOptions = function (song) {
              // debugger
              var skipped = "skip";
              if ( playa.skips.where({ song_id: song.id }).length != 0 ) {
                skipped = "unskip";
              }

              // for each song retreive the number of skips it has
              $.get('/' + playa.creatorName + '/' + playa.playlist_url + '/' + song.id + '/skips_on_song', function(response){
                var skips_num = response.skips_num;
                var skips_pc = response.skips_percentage;

                // end of retreiving that song's skips

                var songViewOptions = {
                  song_info: song,
                  song_skips: skips_num,
                  song_skips_pc: skips_pc,
                  skipped: skipped
                }

                // debugger;
                var song_div = $('<div data-id=' + song.id + '></div>');
                var songViewTemplate = $('#songView-template').html();
                var songViewHTML = _.template(songViewTemplate);
                song_div.html(songViewHTML(songViewOptions));
                song_div.appendTo($('.songs-container'));

                // put this in a function that says render track and call that function 
                // and pass in song 

              });
            }
            songOptions(song);
          }

        }).done(function(){

            // this function will work as long as i reomove the iframe an add a new one each time
            // listens for the song to finish

          playa.initWidget();

          $.get('/' + playa.creatorName + '/' + playa.playlist_url + '/current_song_chosen_by', function (response) {
  
            playa.currentSongByName = response.chosen_by;

              
          }).done(function(){

            $.get('/' + playa.creatorName + '/' + playa.playlist_url + '/' + playa.playlistSongs[0].id + '/skips_on_song', function(response){

              playa.skips_num = response.skips_num;
              playa.skips_pc = response.skips_percentage;
            
              var songStatsOptions = {
                song_chosen_by: playa.currentSongByName,
                skips_on_song: playa.skips_num,
                skips_as_pc: playa.skips_pc
              }
              var songStatsViewTemplate = $('#songStatsView-template').html();
              var songStatsViewHTML = _.template(songStatsViewTemplate);
              $('.playlist-stats').append(songStatsViewHTML(songStatsOptions));  
               
            })

          });
        });

      });

    } else {
      // debugger
      // render the guest view template 
      var playlistGuestViewTemplate = $('#playlistGuestView-template').html();
      var playlistGuestViewHTML = _.template(playlistGuestViewTemplate);
      this.$el.html(playlistGuestViewHTML);

      // render the add songs form
      var addSongsViewTemplate = $('#addSongsView-template').html();
      var addSongsViewHTML = _.template(addSongsViewTemplate);
      $('.guest-add-songs-container').html(addSongsViewHTML);

      // debugger
      // calcualte the playa.song_limit for this playlist

      // renders input field specified number of times for the playlist
      _(playa.currentPlaylist[0].attributes.song_limit).times(function(){
        var addSongViewInputTemplate = $('#addSongInputView-template').html();
        var addSongViewInputHTML = _.template(addSongViewInputTemplate);
        $('.add-songs-form').prepend(addSongViewInputHTML);
      });

      // adds heading to main
      $('.guest-add-songs-container').prepend('<h2>Add Songs</h2>');

      // render playlist songs guest view
      var addSongsViewTemplate = $('#addSongsView-template').html();
      var addSongsViewHTML = _.template(addSongsViewTemplate);
      $('.guest-vote-container').html(addSongsViewHTML);

      // SONGS GUEST VIEW 
      var playlistSongs = $.get('/playlists/' + playa.playlist_url + '/songs').done(function(){
        // debugger
        playa.playlistSongs = playlistSongs.responseJSON;

        // get songs for current playlist
        var songs = playa.playlistSongs;

        playa.skips.fetch().done(function(){
          $('.guest-vote-container').html('')
          for (var i = 0; i < songs.length; i++) {
            var song = songs[i];
            // for each song grab the song id and check whether 
            // the current user's skips include that song id

            var songOptions = function (song) {
              // debugger
              var skipped = "skip";
              if ( playa.skips.where({ song_id: song.id }).length != 0 ) {
                skipped = "unskip";
              }

              // for each song retreive the number of skips it has
              $.get('/' + playa.creatorName + '/' + playa.playlist_url + '/' + song.id + '/skips_on_song', function(response){
                var skips_num = response.skips_num;
                var skips_pc = response.skips_percentage;

                // end of retreiving that song's skips

                var songViewOptions = {
                  song_info: song,
                  song_skips: skips_num,
                  song_skips_pc: skips_pc,
                  skipped: skipped
                }

                // only render the template if the skips on the song are less than 50%
                // debugger;
                var song_div = $('<div data-id=' + song.id + '></div>');
                var songViewTemplate = $('#songView-template').html();
                var songViewHTML = _.template(songViewTemplate);
                song_div.html(songViewHTML(songViewOptions));
                song_div.appendTo($('.guest-vote-container'));

                // put this in a function that says render track and call that function 
                // and pass in song 

              });
            }
            songOptions(song);
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
  },

  playNextTrack: function(event){
    console.log('playing next track')
    // debugger

    // rearrange songview
    $songs = $('.songs-container')[0]
    $first = $songs.firstChild
    $songs.removeChild($first)
    $songs.appendChild($first)

    // rearrange array
    var firstTrack = playa.playlistSongs[0];
    playa.playlistSongs.shift(firstTrack);
    playa.playlistSongs.push(firstTrack);

   // reload the iframe  
    i = playa.playlistSongs[0].iframe
    // debugger;
    var str = $(i).attr("src");
    str += "&auto_play=true";
    $('iframe').parent().html( $(i).attr("src", str) );

    playa.initWidget();

    console.log('end of next track play fn)');
  },

  toggleInfo: function(){

    // var $songView = $('.song-view');

    // debugger

    // $($songView.children[2]).removeClass('hide')

    // $('.song-view').children('.song-info-overlay').toggleClass('hide');
    // $(this).('.song-info-overlay').toggleClass('hide');

     // $('.song-info-overlay').toggleClass('hide');
     console.log('hovering');
     // console.log(this);
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




