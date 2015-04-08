class SongsController < ApplicationController

  def index
    @songs = Song.all
    render :json => @songs
  end

  def create
    @song = Song.new song_params
 
    if @song.update_from_soundcloud
      render :json => @song
    else
      render :json => @song.errors, status: :unprocessable_entity
    end
  end

  def new
    @song = Song.new
  end

  def update
    song = Song.find params[:id]
    song.update song_params
    render :json => song
  end

  private
  def song_params
      params.require(:song).permit(:url, :title, :artist, :year, :album, :image, :playlist_id, :user_id, :iframe, :track_id, :duration, :uri)
  end

end