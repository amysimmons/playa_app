class SongsController < ApplicationController

  def index
    @songs = Song.all
    render :json => @songs
  end

  def create
    @song = Song.new song_params

    respond_to do |format|
      if @song.save
        format.html { redirect_to @song, notice: 'Song was successfully created.' }
        format.json { render :show, status: :created, location: @playlist}
      else
        format.html { render :new }
        format.json { render json: @playlist.errors, status: :unprocessable_entity }
      end
    end

  end

  def new
    @song = Song.new
  end

  private
  def song_params
      params.permit(:url, :title, :artist, :year, :album, :image, :playlist_id, :user_id)
  end

end