var playa = playa || {};
playa.AddSongsView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .add-songs-btn": 'createSongs'
  },

  render: function() {
    console.log('showing new songs view')

    $('#main').empty();

    var addSongsViewTemplate = $('#addSongsView-template').html();
    var addSongsViewHTML = _.template(addSongsViewTemplate);
    this.$el.html(addSongsViewHTML);
  },

  createSongs: function(event){
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    var urls = []
    var playlist_id = playa.playlist_id
    var user_id = playa.currentUser.get("id");
    var input = $('input');
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

      }else if (url.indexOf("youtube") >= 0){


      }else if (url.indexOf("spotify") >= 0){

      }
    };

    playa.router.navigate("shareplaylist", true)

  }

});