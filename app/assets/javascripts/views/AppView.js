var playa = playa || {};

playa.AppView = Backbone.View.extend({
  el: '#main',
  render: function(){
    console.log('rendering the appView');
    // get some html from the dom
    var html = $('#appView').html();
    // // shove it into the element associated with this view 
    this.$el.html(html);

    // // within the app view render the new secret form 
    // var newSecretView = new playa.NewSecretView();
    // newSecretView.render();

  }
});