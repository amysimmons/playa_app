var playa = playa || {};
playa.UserLoggedInView = Backbone.View.extend({

  el: '#header',
  events: {
    "click .nav-link-log-out": 'logUserOut',
    "click .title": 'showHomeView'
  },

  render: function() {
    console.log('showing user logged in view')
    var userLoggedInViewTemplate = $('#userLoggedInView-template').html();
    var userLoggedInViewHTML = _.template(userLoggedInViewTemplate);
    this.$el.html(userLoggedInViewHTML(playa.currentUser.toJSON()));

    var userHomeViewTemplate = $('#userHomeView-template').html();
    var userHomeViewHTML = _.template(userHomeViewTemplate);
    $('#main').html(userHomeViewHTML);

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

  },

  showHomeView: function(event){
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (playa.currentUser){
      playa.router.navigate("", true)
      var userHomeViewTemplate = $('#userHomeView-template').html();
      var userHomeViewHTML = _.template(userHomeViewTemplate);
      $('#main').html(userHomeViewHTML);
    }
    
  }

});