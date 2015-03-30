Rails.application.routes.draw do
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/logout' => 'session#destroy'

  root :to => 'pages#index'

  resources :users
  resources :playlists, only: [:index, :new, :create, :edit, :update, :destroy]
  resources :songs 
  resources :skips, only: [:index, :new, :create]

  get '/myplaylists' => 'playlists#myplaylists'

  get '/is_playlist_owner' => 'playlists#is_playlist_owner'

  get '/:username/:playlist_url' => "playlists#show"

  get '/:username/:playlist_url/shuffle_songs' => 'playlists#playlist_songs'

  get '/playlist_contributor_count' => 'playlists#playlist_contributor_count'

  # get '/shuffle' => 'playlists#shuffle_songs'

  get '/current_song_chosen_by' => 'playlists#current_song_chosen_by'

  get '/skips_on_song' => 'playlists#skips_on_song'

  get '/skips_on_user' => 'playlists#skips_on_user'

end
