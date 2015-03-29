class PlaylistsController < ApplicationController

  def index
    @playlists = Playlist.all
    render :json => @playlists
  end

  def create
    @playlist = Playlist.new playlist_params

      if @playlist.save
        # format.html { redirect_to @playlist, notice: 'Secret was successfully created.' }
        render :json => @playlist
        # format.json { render :json, status: :created}
        # location: @playlist
      else
        # format.html { render :new }
        # binding.pry
        render :json => @playlist.errors, status: :unprocessable_entity
      end
    # end

  end

  def new
    @playlist = Playlist.new
  end

  def show
    # playlist = Playlist.find_by :playlist_url => params[:playlist_url]
    # render :json => playlist
    # render :json => playlist, :include => :moments, :methods => :age
    user = User.find_by(:username => params[:username])
    playlist = user.playlists.find_by(:playlist_url => params[:playlist_url])
    render :json => playlist, :include => :users
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
    current_user = User.find_by :id => session[:user_id]
    # user = User.find_by(:username => params[:username])
    playlist_url = current_user.playlists.find_by(:playlist_url => params[:playlist_url])

    r = current_user.playlists.select{|playlist| playlist.playlist_url == playlist_url}
    r.empty?
    render :json => r.empty?
  end

  private
  def playlist_params
      params.permit(:name, :song_limit, :user_id, :playlist_url)
  end

end