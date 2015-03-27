var playa = playa || {};

playa.Router = Backbone.Router.extend({

  routes: {
    // as soon as i load the page, look at the index, and run the index function
    '': 'index',
    'login': 'login',
    'signup': 'signup',
    'newplaylist': 'newplaylist',
    'addsongs': 'addsongs',
    'shareplaylist': 'shareplaylist',
    'myplaylists': 'myplaylists'

  },
  index: function(){
    var appView = new playa.AppView();
    appView.render();

  },
  login: function(){
    var loginView = new playa.LoginView();
    loginView.render();
  },
  signup: function(){
    var signupView = new playa.SignupView();
    signupView.render();
  },
  newplaylist: function(){
    var newPlaylistView = new playa.NewPlaylistView();
    newPlaylistView.render();
  },
  addsongs: function(){
    var addSongsView = new playa.AddSongsView();
    addSongsView.render();
  },
  shareplaylist: function(){
    var sharePlaylistView = new playa.SharePlaylistView();
    sharePlaylistView.render();
  },
  myplaylists: function(){
    var myPlaylistsView = new playa.MyPlaylistsView();
    myPlaylistsView.render();
  }

});

