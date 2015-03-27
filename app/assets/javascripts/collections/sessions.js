var playa = playa || {};

playa.Sessions = Backbone.Collection.extend({
  url: '/login',
  model: playa.Session
});