var playa = playa || {};

playa.user = Backbone.Model.extend({
  urlRoot: '/index',
  defaults: {
    content:''
  }

});