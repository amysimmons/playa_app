var playa = playa || {};
playa.LoginView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .log-in-btn": 'userLogIn'
  },

  render: function() {
    console.log('showing login form')

    var loginViewTemplate = $('#userLogInView-template').html();
    var loginViewHTML = _.template(loginViewTemplate);
    this.$el.html(loginViewHTML);
  },

  userLogIn: function(){
    console.log('userlogin function called')

    var username = $('#username').val();
    var password = $('#password').val();

    var session = new playa.Session({username: username,password: password});
    session.save();

    // this line not working
    playa.Router.navigate("newplaylist", true)

  }

});

