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
    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var password_confirmation = $('#password_confirmation').val();

    var user = new playa.User({username: username,email: email,password: password,password_confirmation: password_confirmation});
    user.save();

    playa.router.navigate("newplaylist", true)

  }
 // listen for the submit buttons and send data to server 

});