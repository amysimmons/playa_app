var playa = playa || {};

playa.loginNeeded = function () {
  if (playa.currentUser) {
    return false; // Nothing to do.
  } else {
      var userLoggedOutView = new playa.UserLoggedOutView();
      userLoggedOutView.render(); 
      return true;
  }
};

playa.Router = Backbone.Router.extend({

  routes: {
    // as soon as i load the page, look at the index, 
    // and run the index function
    '': 'index',
    'login': 'login',
    'signup': 'signup',
    'newplaylist': 'newplaylist',
    'addsongs': 'addsongs',
    'shareplaylist': 'shareplaylist',
    'myplaylists': 'myplaylists',
    ':username/:playlist_url': 'playlist'
  },

  index: function(){
    $('#main').empty();

    if (playa.loginNeeded()) return;

    var userLoggedInView = new playa.UserLoggedInView();
    userLoggedInView.render(); 

    var appView = new playa.AppView();
    appView.render();

  },
  login: function(){

    $('#main').empty();

    var loginView = new playa.LoginView();
    loginView.render();

    if (playa.loginNeeded()) return;

    var userLoggedInView = new playa.UserLoggedInView();
    userLoggedInView.render(); 

  
  },
  signup: function(){
    $('#main').empty();

    var signupView = new playa.SignupView();
    signupView.render();

    if (playa.loginNeeded()) return;

    var userLoggedInView = new playa.UserLoggedInView();
    userLoggedInView.render(); 

  },
  newplaylist: function(){
    $('#main').empty();

    if (playa.loginNeeded()) return;

    if (playa.destination) {
      var destination = playa.destination;
      playa.destination = null;
      location.hash = destination;
      return;
    }

    var userLoggedInView = new playa.UserLoggedInView();
    userLoggedInView.render(); 

    var newPlaylistView = new playa.NewPlaylistView();
    newPlaylistView.render();

  },
  addsongs: function(){
    $('#main').empty();

    if (playa.loginNeeded()) return;

    var userLoggedInView = new playa.UserLoggedInView();
    userLoggedInView.render();

    var addSongsView = new playa.AddSongsView();
    addSongsView.render();
 
  },
  shareplaylist: function(){
    $('#main').empty();

    if (playa.loginNeeded()) return;

    var userLoggedInView = new playa.UserLoggedInView();
    userLoggedInView.render(); 

    var sharePlaylistView = new playa.SharePlaylistView();
    sharePlaylistView.render();

  },
  myplaylists: function(){
    $('#main').empty();

    if (playa.loginNeeded()) return;

    var userLoggedInView = new playa.UserLoggedInView();
    userLoggedInView.render(); 

    var myPlaylistsView = new playa.MyPlaylistsView();
    myPlaylistsView.render();

  },
  playlist: function(username, playlist_url){
    $('#main').empty();

    playa.currentlyPlaying = playa.currentlyPlaying || {};

    if ( username && playlist_url ) {
      playa.currentlyPlaying.username = username;
      playa.currentlyPlaying.playlist_url = playlist_url;
    }

    username = username || playa.currentlyPlaying.username;
    playlist_url = playlist_url || playa.currentlyPlaying.playlist_url;

    if (playa.loginNeeded()) {
      playa.destination = location.hash;
      return;
    }

    var userLoggedInView = new playa.UserLoggedInView();
    userLoggedInView.render(); 

    playa.playlistView = new playa.PlaylistView();

    playa.playlistView.render(username, playlist_url);

  }

});

