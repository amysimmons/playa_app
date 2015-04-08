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
    playlist = Playlist.find_by(:playlist_url => params[:playlist_url])
    count = playlist.songs.map{|song|song.user_id}.uniq.count
    render :json => count
  end

  def playlist_songs
    playlist = Playlist.find_by(:playlist_url => params[:playlist_url])
    shuffled_songs = playlist.songs.shuffle

    # use this to show skipped songs on page
    skipped_songs = []

    # push any songs with more than 50pc skips into the skipped_songs array
    shuffled_songs.each do |song|
      contributor_count = playlist.songs.map{|song|song.user_id}.uniq.count
      skips_on_song =  song.skips.count
      percentage_of_skips = (skips_on_song / contributor_count.to_f) * 100

      if percentage_of_skips > 50 && contributor_count > 1
        skipped_songs << song
      end

    end
     # go through each song, if the song is in skipped songs array reject it
    shuffled_songs.reject! { |song| skipped_songs.include? song }
    render :json => shuffled_songs
  end

  def current_song_chosen_by
    playlist = Playlist.find_by(:playlist_url => params[:playlist_url])
    first_song_chosen_by = playlist.songs[0].user.username
    render :json => { chosen_by: first_song_chosen_by }
  end

  private
  def playlist_params
      params.require(:playlist).permit(:name, :song_limit, :user_id, :playlist_url)
  end

end