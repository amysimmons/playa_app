# == Schema Information
#
# Table name: skips
#
#  id         :integer          not null, primary key
#  song_id    :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  is_skipped :boolean
#

require 'rails_helper'

RSpec.describe Skip, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
