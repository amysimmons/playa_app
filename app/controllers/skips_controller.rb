class SongsController < ApplicationController

  def index
    skips = Skip.all
    render :json => skips
  end

  def skips_on_song
    #gets the number of skips on a particular song
    skips_num = Song.find(:id).skips.count

    # gets the number of contributors to that playlist
    playlist = Playlist.find_by(:playlist_url => params[:playlist_url])
    count = playlist.songs.map{|song|song.user_id}.uniq.count
 
    # calculates percenate of users who have skipped the song
    skips_percentage = (skips_num/count.to_f)*100

    render :json => skips_num, skips_percentage
  end

  def skips_on_user
    # gets the number of songs chosen by a particular user which have been skipped
    skips_num = User.find(:id).skips.count
    songs_num = User.find(:id).songs.count

    # calculates the user's skip rate
    skips_percentage = (skips_num/songs_num.to_f)*100

    render :json => skips_percentage
  end

end