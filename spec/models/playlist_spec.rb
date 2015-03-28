# == Schema Information
#
# Table name: playlists
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#  song_limit :integer
#

require 'rails_helper'

RSpec.describe Playlist, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
