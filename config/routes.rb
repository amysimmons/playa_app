Rails.application.routes.draw do
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/logout' => 'session#destroy'

  root :to => 'pages#index'

  resources :users
  resources :playlists, only: [:index, :new, :create, :edit, :update, :destroy]
  resources :songs 
  resources :skips, only: [:index, :new, :create, :destroy]

  get '/myplaylists' => 'playlists#myplaylists'

  get '/is_playlist_owner' => 'playlists#is_playlist_owner'

  get '/:username/:playlist_url' => "playlists#show"

  get '/playlists/:playlist_url/songs' => 'playlists#playlist_songs'

  get '/:username/:playlist_url/playlist_contributor_count' => 'playlists#playlist_contributor_count'

  get '/:username/:playlist_url/current_song_chosen_by' => 'playlists#current_song_chosen_by'

  delete '/skips' => 'skips#destroy'

  get '/:username/:playlist_url/:id/skips_on_song' => 'skips#skips_on_song'

  get '/skips_on_user' => 'skips#skips_on_user'

end
