# == Schema Information
#
# Table name: playlists
#
#  id           :integer          not null, primary key
#  name         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :integer
#  song_limit   :integer
#  playlist_url :text
#

class Playlist < ActiveRecord::Base
  belongs_to :user
  has_many :songs
end
