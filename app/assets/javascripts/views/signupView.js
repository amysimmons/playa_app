var playa = playa || {};

playa.SignupView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .nav-link-sign-up": 'showSignupForm'
  },

  render: function(){
    // event.preventDefault();
    console.log('showing signup form')
    var signupViewTemplate = $('#userSignUpView-template').html();
    var signupViewHTML = _.template(signupViewTemplate);
    this.$el.html(signupViewHTML);
  }

 // listen for the submit buttons and send data to server 


});