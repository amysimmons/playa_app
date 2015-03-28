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
    'myplaylists': 'myplaylists',
    'playlists/id': 'playlist'

  },
  index: function(){
    var appView = new playa.AppView();
    appView.render();

    var userLoggedOutView = new playa.UserLoggedOutView();
    userLoggedOutView.render();

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
  },
  playlist: function(id){
    var playlistView = new playa.PlaylistView();
    playlistView.render();
  }


  // viewBook:function(id){
  //   $('#main').show();
  //   app.burningFlights.fetch().done(function () {
  //     var flight = app.burningFlights.get(id); 
  //     var plane_id = flight.attributes.plane_id; 
  //     var options = {
  //       flight: app.burningFlights.get(id), 
  //       plane_id: flight.attributes.plane_id, 
  //       plane: app.burningPlanes.get(plane_id) 
  //     }
  //     var bookingView = new app.BookingView({model: options});
  //     bookingView.render(options.plane);
  //   }); 
  // }, 



});

