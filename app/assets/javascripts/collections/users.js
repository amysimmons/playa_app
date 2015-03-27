var playa = playa || {};

playa.Users = Backbone.Collection.extend({
  url: '/users',
  model: playa.User
});