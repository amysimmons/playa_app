var playa = playa || {};
playa.AddSongsView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .add-songs-btn": 'createSongs'
  },

  render: function() {
    console.log('showing new songs view')

    var addSongsViewTemplate = $('#addSongsView-template').html();
    var addSongsViewHTML = _.template(addSongsViewTemplate);
    this.$el.html(addSongsViewHTML);
  },

  createSongs: function(event){
    event.preventDefault();

    var urls = []
    var playlist_id = x
    var user_id = playa.currentUser.get("id")
    var input = $('input')
    var val = input.val();

    $.each(input, function() {
      urls.push(val);
    });

    for (var i = 0; i < urls.length; i++) {
      var url = urls[i]
      var song = new playa.Song({url: url, playlist_id: playlist_id, user_id: user_id})
      song.save();
      playa.songs.add(song);
    };
 
    for (var i = 0; i < urls.length; i++) {
      url = urls[i]
      if (url.indexOf("soundcloud") >= 0){

      // https://soundcloud.com/oembed?url=https://www.soundcloud.com/comedy-central/the-unf-kables-dave-attell/&format=xml

      // <script src="http://connect.soundcloud.com/sdk.js"></script>
      // <script>


      // make my songs controller do this


      SC.initialize({
        client_id: '42df4f88b96074520cc64f4be69e3ab4'
      });

      var track_url = url;
      SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
        console.log('oEmbed response: ' + oEmbed);
      });
      // </script>
         debugger;


      }else if (url.indexOf("youtube") >= 0){

      // http://www.youtube.com/oembed?url=http%3A//www.youtube.com/watch?v%3D-UUx10KOWIE&format=xml

      // resource = OEmbed::Providers::Youtube.get("http://www.youtube.com/watch?v=2BYXBC8WQ5k")
      // resource.video? #=> true
      // resource.thumbnail_url #=> "http://i3.ytimg.com/vi/2BYXBC8WQ5k/hqdefault.jpg"
      // resource.html #=> <<-HTML
      // <object width="425" height="344">
      // <param name="movie" value="http://www.youtube.com/v/2BYXBC8WQ5k?fs=1"></param>
      // <param name="allowFullScreen" value="true"></param>
      // <param name="allowscriptaccess" value="always"></param>
      // <embed src="http://www.youtube.com/v/2BYXBC8WQ5k?fs=1" type="application/x-shockwave-flash" width="425" height="344" allowscriptaccess="always" allowfullscreen="true"></embed>
      // </object>
      // HTML


      }else if (url.indexOf("spotify") >= 0){

      }
    };

    playa.router.navigate("shareplaylist", true)

  }

});