var playa = playa || {};
playa.AddSongsView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .add-songs-btn": function (event) {
      playa.createSongs(event);
    }
  },

  render: function() {
    console.log('showing new songs view')

    $('#main').empty();

    var addSongsViewTemplate = $('#addSongsView-template').html();
    var addSongsViewHTML = _.template(addSongsViewTemplate);
    this.$el.html(addSongsViewHTML);
  }


});

// s2 = Song.create(:url => 'https://soundcloud.com/thepreatures/ithyf')
// s3 = Song.create(:url => 'https://soundcloud.com/jules575-profile/of-monsters-and-men-love-love')
// s4 = Song.create(:url => 'https://soundcloud.com/ladyrosa/tracy-chapman-fast-car')
// s5 = Song.create(:url => 'https://soundcloud.com/markronson/uptown-funk-benji-b-disco-dub-mix')
// s6 = Song.create(:url => 'https://soundcloud.com/alabamashakes/youaintalone')
// s7 = Song.create(:url => 'https://soundcloud.com/alabamashakes/hold-on')
// s8 = Song.create(:url => 'https://soundcloud.com/jamiroquai/canned-heat')
// s9 = Song.create(:url => 'https://soundcloud.com/gotye/4-eyes-wide-open')
// s10 = Song.create(:url => 'https://soundcloud.com/vancejoy/02-riptide')
// s11 = Song.create(:url => 'https://soundcloud.com/asgeirmusic/asgeir-torrent')
// s12 = Song.create(:url => 'https://soundcloud.com/asgeirmusic/asgeir-king-and-cross')
// s13 = Song.create(:url => 'https://soundcloud.com/poppyhenri/deee-lite-groove-is-in-the-heart')
// s14 = Song.create(:url => 'https://soundcloud.com/robyn/dancing-on-my-own')
// s15 = Song.create(:url => 'https://soundcloud.com/robyn/call-your-girlfriend')


// look at the playlist view to see what i did with is_playlist_owner json 
// do something similar with soundcloud_api_info

    // for (var i = 0; i < urls.length; i++) {
    //   url = urls[i]
    //   if (url.indexOf("soundcloud") >= 0){

    //   }else if (url.indexOf("youtube") >= 0){


    //   }else if (url.indexOf("spotify") >= 0){

    //   }
    // };