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

  # has_many :users, through: :skips

  validates :url, :presence => true
  validates :iframe, :presence => true

  def update_from_soundcloud
      if url.include? "soundcloud"
        # create a client object with your app credentials
        client = Soundcloud.new(:client_id => '42df4f88b96074520cc64f4be69e3ab4')
        # a permalink to a track
        track_url = url
        # resolve track URL into track resource
        track = client.get('/resolve', :url => track_url)
        #get track id, duration and uri
        track_id = track['id']
        duration = track['duration']
        uri = track['uri']
        # get the track's oembed data
        embed_info = client.get('/oembed', :url => track_url)
        # hold onto song attributes
        title = embed_info['title']
        thumbnail_url = embed_info['thumbnail_url']
        iframe = embed_info['html']
        author_name = embed_info['author_name']
        # update song params with api data
        update(:title => title, :artist => author_name, :image => thumbnail_url, :iframe => iframe, :track_id => track_id, :duration => duration, :uri => uri)
      end
    end

end
