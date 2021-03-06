class SkipsController < ApplicationController

  def index
    render :json => @current_user.skips
  end

  def create
    @skip = Skip.new skip_params
    if @skip.save
      skips_on_song(true, params["song_id"])
      render :json => { skip: @skip, skips_num: @skips_num, skips_percentage: @skips_percentage }
    else
      render :json => @skip.errors, status: :unprocessable_entity
    end
  end

  def new
    @skip = Skip.new
  end

  def destroy
    skip = Skip.where( :user_id => params["user_id"], :song_id => params["song_id"] )
    if Skip.destroy( skip[0].id )
      skips_on_song(true, params["song_id"])
      render :json => { status: "OK", skips_num: @skips_num, skips_percentage: @skips_percentage }
    else
      render :json => { status: "NOT OK" }
    end

  end

  def skips_on_song(called = false, id = false)
    #gets the number of skips on a particular song
    @skips_num = Song.find_by(:id => params[:id] || id).skips.count

    # gets the number of contributors to that playlist
    playlist = Playlist.find_by(:playlist_url => params[:playlist_url])
    count = playlist.songs.map{|song|song.user_id}.uniq.count
 
    # calculate percenate of users who have skipped the song
    @skips_percentage = (@skips_num/count.to_f)*100

    if !called
      render :json => { skips_num: @skips_num, skips_percentage: @skips_percentage }
    end
  end

  def skips_on_user
    # gets the number of songs chosen by a particular user which have been skipped
    skips_num = User.find(:id).skips.count
    songs_num = User.find(:id).songs.count

    # calculate the user's skip rate
    skips_percentage = (skips_num/songs_num.to_f)*100

    render :json => skips_percentage
  end

  private
  def skip_params
      params.permit(:song_id, :user_id, :is_skipped)
  end

end