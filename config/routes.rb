Rails.application.routes.draw do
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/logout' => 'session#destroy'

  root :to => 'pages#index'
  resources :users
  resources :playlists
  resources :songs
  resources :skips

  get 'myplaylists' => 'playlists#myplaylists'

  get '/:username/:playlist_url' => "playlists#show"

end
