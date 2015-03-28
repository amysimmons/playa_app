class PlaylistsController < ApplicationController

  def index
    @playlists = Playlist.all
    render :json => @playlists
  end

  def create
    @playlist = Playlist.new playlist_params

    respond_to do |format|
      if @playlist.save
        format.html { redirect_to @playlist, notice: 'Secret was successfully created.' }
        format.json { render :show, status: :created, location: @playlist}
      else
        format.html { render :new }
        format.json { render json: @playlist.errors, status: :unprocessable_entity }
      end
    end

  end

  def new
    @playlist = Playlist.new
  end

  def show
  end

  def myplaylists
    @current_user = User.find_by :id => session[:user_id]
    @myplaylists = @current_user.playlists
    render :json => @myplaylists
  end

  private
  def playlist_params
      params.permit(:name, :song_limit, :user_id)
  end

end