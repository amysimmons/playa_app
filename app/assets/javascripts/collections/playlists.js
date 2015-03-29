var playa = playa || {};

playa.Playlists = Backbone.Collection.extend({
  url: '/playlists',
  model: playa.Playlist
});
