class SongsController < ApplicationController

  def index
    @songs = Song.all
    render :json => @songs
  end

  def create
    @song = Song.new song_params
      if @song.save
        if @song.url.include? "soundcloud"
          url = @song.url
           # create a client object with your app credentials
          client = Soundcloud.new(:client_id => '42df4f88b96074520cc64f4be69e3ab4')
          # a permalink to a track
          track_url = url
          # resolve track URL into track resource
          track = client.get('/resolve', :url => track_url)
          #get track id, duration and uri
          track_id = track['id']
          duration = track['duration']
          uri = track['uri']
          # get the track's oembed data
          embed_info = client.get('/oembed', :url => track_url)
          # hold onto song attributes
          title = embed_info['title']
          thumbnail_url = embed_info['thumbnail_url']
          iframe = embed_info['html']
          author_name = embed_info['author_name']
          # update song params with api data
          @song.update(:title => title, :artist => author_name, :image => thumbnail_url, :iframe => iframe, :track_id => track_id, :duration => duration, :uri => uri)
        end
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
      params.permit(:url, :title, :artist, :year, :album, :image, :playlist_id, :user_id, :iframe, :track_id, :duration, :uri)
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