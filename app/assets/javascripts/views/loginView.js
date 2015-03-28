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

  userLogIn: function(event){
    console.log('userlogin function called')
    event.preventDefault()
    event.stopPropagation();
    event.stopImmediatePropagation();
    var username = $('#username').val();
    var password = $('#password').val();


    $.post('/login', { data: {username: username,password: password} }).done(function(user){

      // hang on to the user object
      playa.currentUser = new playa.User(user);
      var userLoggedInView = new playa.UserLoggedInView(playa.currentUser);
      userLoggedInView.render(); // if this has el: '#main', it will replace the old appView


    }).error(function(){

     // leave form on page and prepend an error msg to main 
      var errorMsg = $('<p>Wrong username or password</p>');
      $('form').prepend(errorMsg);

    });

    playa.router.navigate("newplaylist", true)

  }

});






