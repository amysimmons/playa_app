class AddIframeToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :iframe, :text
  end
end
