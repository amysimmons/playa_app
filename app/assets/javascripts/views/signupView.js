var playa = playa || {};

playa.SignupView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .sign-up-btn": 'userSignUp'
  },

  render: function(){
    console.log('showing signup form')
    var signupViewTemplate = $('#userSignUpView-template').html();
    var signupViewHTML = _.template(signupViewTemplate);
    this.$el.html(signupViewHTML);
  },

  userSignUp: function(event){
    console.log('userlogin signup function called')
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    var username = $('#username').val().toLowerCase();
    var email = $('#email').val();
    var password = $('#password').val();
    var password_confirmation = $('#password_confirmation').val();

    var user = new playa.User({username: username,email: email,password: password,password_confirmation: password_confirmation});
    user.save().done(function(user){
      
      console.log('user saved');

      // hang on to the user object
      playa.currentUser = new playa.User(user); 
      // #render the user logged in nav 
      var userLoggedInView = new playa.UserLoggedInView(playa.currentUser);
      userLoggedInView.render();
      playa.router.navigate("newplaylist", true);
    
    // if this has el: '#main', it will replace the old appView

    }).error(function(){

     // leave form on page and prepend an error msg to main 
      var errorMsg = $('<p>Something went wrong</p>');
      $('form').prepend(errorMsg);

    });

  }
});