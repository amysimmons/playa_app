class AddSongLimitToPlaylists < ActiveRecord::Migration
  def change
    add_column :playlists, :song_limit, :integer
  end
end
