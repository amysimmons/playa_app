# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string
#  email           :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base

  has_secure_password

  validates :username, :format => { with: /\A[a-zA-Z0-9_.@-]+\Z/ }, :presence => true, :uniqueness => true
  validates :email, :presence => true, :uniqueness => true
  validates :password, :presence => true,
                       :confirmation => true,
                       :length => {:within => 6..30},
                       :on => :create

  has_many :playlists
  has_many :songs
  has_many :skips


end
