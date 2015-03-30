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

    if (playa.loginNeeded()) return;

    var userLoggedInView = new playa.UserLoggedInView();
    userLoggedInView.render(); 
    // debugger
    // find the playlist currently on page
    // var playlist = playa.playlists.where({playlist_url: playlist_url});

    // pass the playlist model into the view
    // debugger
    var playlistView = new playa.PlaylistView();
    playlistView.render(username, playlist_url);

  }

});

