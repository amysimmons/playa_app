var playa = playa || {};

playa.Router = Backbone.Router.extend({

  routes: {
    // as soon as i load the page, look at the index, and run the index function
    '': 'index',
    'login': 'login',
    'signup': 'signup'

    // log in sign up funciton below, 
    // these fnctions just show the view

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
  }

});