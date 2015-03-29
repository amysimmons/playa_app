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
#

require 'rails_helper'

RSpec.describe Song, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
