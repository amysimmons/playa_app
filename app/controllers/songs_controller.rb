class SongsController < ApplicationController

  def index
    @songs = Song.all
    render :json => @songs
  end

  def create
    @song = Song.new song_params

      if @song.save
        # format.html { redirect_to @playlist, notice: 'Secret was successfully created.' }
        render :json => @song
        # format.json { render :json, status: :created}
        # location: @playlist
      else
        # format.html { render :new }
        # binding.pry
        render :json => @song.errors, status: :unprocessable_entity
      end


    # respond_to do |format|
    #   if @song.save
    #     # format.html { redirect_to @song, notice: 'Song was successfully created.' }
    #     format.json { render :show, status: :created, location: @playlist}
    #   else
    #     # format.html { render :new }
    #     format.json { render json: @playlist.errors, status: :unprocessable_entity }
    #   end
    # end

  end

  def new
    @song = Song.new
  end

  def show
  end

  def soundcloud

  end

  def youtube

  end

  def spotify

  end

  # // https://soundcloud.com/oembed?url=https://www.soundcloud.com/comedy-central/the-unf-kables-dave-attell/&format=xml

  # // <script src="http://connect.soundcloud.com/sdk.js"></script>
  # // <script>


  # // make my songs controller do this


  # // SC.initialize({
  # //   client_id: '42df4f88b96074520cc64f4be69e3ab4'
  # // });

  # // var track_url = url;
  # // SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
  # //   console.log('oEmbed response: ' + oEmbed);
  # // });
  # // </script>
  #    // debugger;


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


  private
  def song_params
      params.permit(:url, :title, :artist, :year, :album, :image, :playlist_id, :user_id)
  end

end