var playa = playa || {};
console.log("WHATTHAHIAHKN")
playa.LoginView = Backbone.View.extend({

  el: '#main',
  events: {
    "click .nav-link-log-in": 'showLoginForm'
  },

  render: function() {
    console.log('showing login form')

    var loginViewTemplate = $('#userLogInView-template').html();
    var loginViewHTML = _.template(loginViewTemplate);
    this.$el.html(loginViewHTML);
  }
});

