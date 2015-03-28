var playa = playa || {};

playa.Playlists = Backbone.Collection.extend({
  url: '/playlists',
  model: playa.Playlist
});


//   initialize:function(){
//     this.on('sync', function(){
//       console.log('sync successful');
//       // within the app view render the secrets collection
//       var secretsView = new whisper.SecretsView({collection: whisper.secrets});
//       secretsView.render();
//     });


//   this.start();

// var myView = Backbone.View.extend({
//            ....
//            initialize : function () {
//                 this.collection.bind('change',  this.SOME_LISTENING_FUNC    );

//              }
//   });