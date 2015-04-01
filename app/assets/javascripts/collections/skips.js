var playa = playa || {};

playa.Skips = Backbone.Collection.extend({
  url: '/skips',
  model: playa.Skip

});

// trying to fetch for skips:

//   initialize:function(){
//     this.on('sync', function(){
//       console.log('sync successful');
//       // within the app view render the secrets collection
//       var playlistView = new playa.PlaylistView({collection: playa.skips});
//       playlistView.render();
//     });

//   this.start();

// },

//   start: function(){

//     var skips = this;

//     skips.fetch();

//     this.timer = setInterval(function(){
//       skips.fetch();
//     }, 3000);
//     // debugger;
//   }