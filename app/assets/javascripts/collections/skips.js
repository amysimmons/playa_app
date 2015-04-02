var playa = playa || {};

playa.Skips = Backbone.Collection.extend({
  url: '/skips',
  model: playa.Skip

});
