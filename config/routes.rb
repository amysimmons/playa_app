Rails.application.routes.draw do
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/logout' => 'session#destroy'

  root :to => 'pages#index'


  get '/:username/:playlist_url' => "playlists#show"

  resources :users
  resources :playlists, only: [:index, :new, :create, :edit, :update, :destroy]
  resources :songs 
  resources :skips

  get 'myplaylists' => 'playlists#myplaylists'

  get '/is_playlist_owner' => 'playlists#is_playlist_owner'

  get '/soundcloud_api_info' => 'songs#soundcloud'

end
