class PlaylistsController < ApplicationController

  def index
    @playlists = Playlist.all
    render :json => @playlists
  end

  def create
    @playlist = Playlist.new playlist_params

      if @playlist.save
        render :json => @playlist
      else
        render :json => @playlist.errors, status: :unprocessable_entity
      end
  end

  def new
    @playlist = Playlist.new
  end

  def show
    user = User.find_by(:username => params[:username])
    playlist = user.playlists.find_by(:playlist_url => params[:playlist_url])
    render :json => playlist
  end

  def update
    playlist = Playlist.find params[:id]
    playlist.update playlist_params
    render :json => playlist
  end

  def myplaylists
    @current_user = User.find_by :id => session[:user_id]
    @myplaylists = @current_user.playlists
    render :json => @myplaylists
  end

  def is_playlist_owner
    playlist = Playlist.where( :playlist_url => params["playlist_url"] )
    is_owner = ( playlist[0].user_id === session["user_id"] )
    render :json => is_owner
  end

  def playlist_contributor_count
    # binding.pry
    playlist = Playlist.find_by(:playlist_url => params[:playlist_url])
    count = playlist.songs.map{|song|song.user_id}.uniq.count
    render :json => count
  end

  def playlist_songs
    # binding.pry
    playlist = Playlist.find_by(:playlist_url => params[:playlist_url])
    shuffled_songs = playlist.songs.shuffle
    render :json => shuffled_songs
    # end
  end

  def current_song_chosen_by
    # binding.pry
    playlist = Playlist.find_by(:playlist_url => params[:playlist_url])
    first_song_chosen_by = playlist.songs[0].user.username
    render :json => { chosen_by: first_song_chosen_by }
  end

  private
  def playlist_params
      params.permit(:name, :song_limit, :user_id, :playlist_url)
  end

end