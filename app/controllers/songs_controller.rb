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
      # params.permit(:url, :title, :artist, :year, :album, :image, :playlist_id, :user_id, :iframe, :track_id, :duration, :uri)
      params.require(:song).permit(:url, :title, :artist, :year, :album, :image, :playlist_id, :user_id, :iframe, :track_id, :duration, :uri)
  end

end

  # // http://www.youtube.com/oembed?url=http%3A//www.youtube.com/watch?v%3D-UUx10KOWIE&format=xml

  # // resource = OEmbed::Providers::Youtube.get("http://www.youtube.com/watch?v=2BYXBC8WQ5k")
  # // resource.video? #=> true
  # // resource.thumbnail_url #=> "http://i3.ytimg.com/vi/2BYXBC8WQ5k/hqdefault.jpg"
  # // resource.html #=> <<-HTML
  # // <object width="425" height="344">
  # // <param name="movie" value="http://www.youtube.com/v/2BYXBC8WQ5k?fs=1"></param>
  # // <param name="allowFullScreen" value="true"></param>
  # // <param name="allowscriptaccess" value="always"></param>
  # // <embed src="http://www.youtube.com/v/2BYXBC8WQ5k?fs=1" type="application/x-shockwave-flash" width="425" height="344" allowscriptaccess="always" allowfullscreen="true"></embed>
  # // </object>
  # // HTML