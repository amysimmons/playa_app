class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.text :url
      t.string :title
      t.string :artist
      t.string :album
      t.string :year
      t.integer :playlist_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
