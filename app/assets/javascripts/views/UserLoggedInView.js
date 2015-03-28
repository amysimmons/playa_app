var playa = playa || {};
playa.UserLoggedInView = Backbone.View.extend({

  el: '#header',
  events: {
    "click .nav-link-log-out": 'logUserOut'
  },

  render: function() {
    console.log('showing user logged in view')
    var userLoggedInViewTemplate = $('#userLoggedInView-template').html();
    var userLoggedInViewHTML = _.template(userLoggedInViewTemplate);
    this.$el.html(userLoggedInViewHTML);
  },

  logUserOut: function(event){
      event.preventDefault();
      $.ajax('/logout', {
        type: 'DELETE',
        data: {_method: "DELETE"}
      }
        ).done(function(result){
          console.log(result);
          playa.currentUser = null;
        playa.router.navigate("", true)

      })

  }

});