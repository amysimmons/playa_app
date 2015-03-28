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



    // $.ajax({
    //     url: '/logout',
    //     type: 'DELETE',
    //     success: function(result) {
    //         // Do something with the result
    //     }
    // });
    //   .done(function(user){

    //   // hang on to the user object
    //   playa.currentUser = new playa.User(user);

    //   var userLoggedOutView = new playa.UserLoggedOutView(playa.currentUser);
    //   userLoggedOutView.render(); // if this has el: '#main', it will replace the old appView

    //   // debugger

    // })

    // playa.router.navigate("", true)

  }

});