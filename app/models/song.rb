# == Schema Information
#
# Table name: songs
#
#  id          :integer          not null, primary key
#  url         :text
#  title       :string
#  artist      :string
#  album       :string
#  year        :string
#  playlist_id :integer
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  image       :text
#  iframe      :text
#  track_id    :string
#  duration    :integer
#  uri         :text
#

class Song < ActiveRecord::Base
  has_many :skips
  belongs_to :user
  belongs_to :playlist
end
