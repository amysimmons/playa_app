var playa = playa || {};

playa.Myplaylists = Backbone.Collection.extend({
  url: '/myplaylists',
  model: playa.Myplaylist
});


