class AddSoundcloudInfoToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :track_id, :string
    add_column :songs, :duration, :integer
    add_column :songs, :uri, :text
  end
end
