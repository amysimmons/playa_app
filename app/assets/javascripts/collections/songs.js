var playa = playa || {};

playa.Songs = Backbone.Collection.extend({
  url: '/songs',
  model: playa.Song
});