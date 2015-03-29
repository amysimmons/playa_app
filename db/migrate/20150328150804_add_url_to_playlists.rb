class AddUrlToPlaylists < ActiveRecord::Migration
  def change
    add_column :playlists, :playlist_url, :text
  end
end
