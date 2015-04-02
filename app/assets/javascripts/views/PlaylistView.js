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

      var contributors = $.get('/'+playa.creatorName+'/'+playa.playlist_url+'/playlist_contributor_count').done(function(){ 
        playa.currentPlaylistContributors = contributors.responseText;
      }).done(function(){

        // if user is logged in and user owns the playlist show the playlist owner view
        $.get('/is_playlist_owner', { playlist_url: playa.playlist_url }).done(function(isOwnerOfPlaylist){
          view.showView(isOwnerOfPlaylist);
        }); 

      });

    });

  },

  showView: function(isOwnerOfPlaylist){
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

        // show the playlist songs on the page
      var playlistSongs = $.get('/playlists/' + playa.playlist_url + '/songs').done(function(response){
   
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
      // render the guest view template 
      var playlistGuestViewTemplate = $('#playlistGuestView-template').html();
      var playlistGuestViewHTML = _.template(playlistGuestViewTemplate);
      this.$el.html(playlistGuestViewHTML);

      // render top template

      //render player view to show the first song in the shuffled song array
      var guestTopOptions = {
        playlist_name: playa.currentPlaylist[0].attributes.name,
        creator_name: playa.creatorName,
        contributor_count: playa.currentPlaylistContributors
      }
        // debugger

      var playlistTopGuestViewTemplate = $('#playlistTopGuestView-template').html();
      var playlistTopGuestViewHTML = _.template(playlistTopGuestViewTemplate);
      $('.guest-playlist-name-stats-container').html(playlistTopGuestViewHTML(guestTopOptions));


      // render the add songs form
      var addSongsViewTemplate = $('#addSongsView-template').html();
      var addSongsViewHTML = _.template(addSongsViewTemplate);
      $('.guest-add-songs-container').html(addSongsViewHTML);

      // calcualte the playa.song_limit for this playlist

      // renders input field specified number of times for the playlist
      _(playa.currentPlaylist[0].attributes.song_limit).times(function(){
        var addSongViewInputTemplate = $('#addSongInputView-template').html();
        var addSongViewInputHTML = _.template(addSongViewInputTemplate);
        $('.add-songs-form').prepend(addSongViewInputHTML);
      });

      // adds heading to main
      $('.main-container').prepend('<p class="guest-add-songs-p">Submit your SoundCloud URLs below</p>').prepend('<h2 class="guest-add-songs-head">Add Songs</h2>');

      // render playlist songs guest view
      var addSongsViewTemplate = $('#addSongsView-template').html();
      var addSongsViewHTML = _.template(addSongsViewTemplate);
      $('.guest-vote-container').html(addSongsViewHTML);

      // SONGS GUEST VIEW 
      var playlistSongs = $.get('/playlists/' + playa.playlist_url + '/songs').done(function(){
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

  },

  createOrDeleteSkip: function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
    var currentElement = $(event.currentTarget);
    event.preventDefault();
    // console.log('skipping or unskipping');

    // if button has class of skipped
    // post request 

    // elsif has class unskipping
      // delete post request 

    var user_id = playa.currentUser.id;
    var song_id = $(event.currentTarget).parent().parent().parent().data("id");

    if ( $(event.currentTarget).hasClass("skip") ) {
      // console.log("It had the class skip, save it.");
      var skip = new playa.Skip({ user_id: user_id, song_id: song_id, playlist_url: playa.playlist_url })
      skip.save().done(function(response){
        // Change the text to "Unskip"
        // Remove the class skip and add unskip
        currentElement.text("Vote to unskip");
        currentElement.removeClass("skip").addClass("unskip");
        $( currentElement.parent().children("ul").children("li")[2] ).text("Skips: " + response.skips_num + ", " + response.skips_percentage + "%")

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
          song_id: song_id, 
          playlist_url: playa.playlist_url
        },
        success: function (response) {
          currentElement.text("Vote to skip");
          currentElement.removeClass("unskip").addClass("skip");
          $( currentElement.parent().children("ul").children("li")[2] ).text("Skips: " + response.skips_num + ", " + response.skips_percentage + "%")
        }
      })
    }
  },

  playNextTrack: function(event){
    console.log('playing next track')

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
    var str = $(i).attr("src");
    str += "&auto_play=true";
    $('iframe').parent().html( $(i).attr("src", str) );

    playa.initWidget();

    console.log('end of next track play fn)');
  }

});
