var playa = playa || {};
console.log("WHATTHAHIAHKN")
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
    var email = $('#email').val();
    var password = $('#password').val();
    var password_confirmation = $('#password_confirmation').val();
    
  }

});

