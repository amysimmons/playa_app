User.destroy_all
Playlist.destroy_all
Song.destroy_all
Skip.destroy_all

#create users
u1 = User.create(:username => 'Amy', :email => 'amy@amy.com', :password => 'chicken', :password_confirmation => 'chicken')
u2 = User.create(:username => 'Julia', :email => 'julia@julia.com', :password => 'chicken', :password_confirmation => 'chicken')
u3 = User.create(:username => 'Bishin', :email => 'bishin@bishin.com', :password => 'chicken', :password_confirmation => 'chicken')
u4 = User.create(:username => 'May', :email => 'may@may.com', :password => 'chicken', :password_confirmation => 'chicken')
u5 = User.create(:username => 'Faryar', :email => 'faryar@faryar.com', :password => 'chicken', :password_confirmation => 'chicken')
u6 = User.create(:username => 'Sox', :email => 'sox@sox.com', :password => 'chicken', :password_confirmation => 'chicken')

#create playlists
p1 = Playlist.create(:name => "Friday Night At Amy's")
p2 = Playlist.create(:name => '90s All The Way')
p3 = Playlist.create(:name => 'Sunday Session')
p4 = Playlist.create(:name => 'Last Day Of School')
p5 = Playlist.create(:name => 'Yoga Party')
p6 = Playlist.create(:name => 'I Turn 21')
p7 = Playlist.create(:name => "Jack and Joel's Wedding")
p8 = Playlist.create(:name => 'Robyn and Swift Pop Night')

#create songs
s1 = Song.create(:url => 'https://soundcloud.com/theshins/4-bait-and-switch')
s2 = Song.create(:url => 'https://soundcloud.com/thepreatures/ithyf')
s3 = Song.create(:url => 'https://soundcloud.com/jules575-profile/of-monsters-and-men-love-love')
s4 = Song.create(:url => 'https://soundcloud.com/ladyrosa/tracy-chapman-fast-car')
s5 = Song.create(:url => 'https://soundcloud.com/markronson/uptown-funk-benji-b-disco-dub-mix')
s6 = Song.create(:url => 'https://soundcloud.com/alabamashakes/youaintalone')
s7 = Song.create(:url => 'https://soundcloud.com/alabamashakes/hold-on')
s8 = Song.create(:url => 'https://soundcloud.com/jamiroquai/canned-heat')
s9 = Song.create(:url => 'https://soundcloud.com/gotye/4-eyes-wide-open')
s10 = Song.create(:url => 'https://soundcloud.com/vancejoy/02-riptide')
s11 = Song.create(:url => 'https://soundcloud.com/asgeirmusic/asgeir-torrent')
s12 = Song.create(:url => 'https://soundcloud.com/asgeirmusic/asgeir-king-and-cross')
s13 = Song.create(:url => 'https://soundcloud.com/poppyhenri/deee-lite-groove-is-in-the-heart')
s14 = Song.create(:url => 'https://soundcloud.com/robyn/dancing-on-my-own')
s15 = Song.create(:url => 'https://soundcloud.com/robyn/call-your-girlfriend')

#create skips
Skip.create(:user_id => u1.id, :song_id => s15.id)
Skip.create(:user_id => u2.id, :song_id => s14.id)
Skip.create(:user_id => u3.id, :song_id => s13.id)
Skip.create(:user_id => u4.id, :song_id => s12.id)

#Associate users with playlists
u1.playlists << p1 << p2 << p3
u2.playlists << p4 << p5
u3.playlists << p6 << p7 << p8

#Associate playlists with songs
p1.songs << s1 << s2
p2.songs << s3 << s4
p3.songs << s5 << s6
p4.songs << s7 << s8
p5.songs << s9 << s10
p6.songs << s11 << s12
p7.songs << s13 << s14 << s15

#Associate songs with users
u1.songs << s1 << s2 << s3
u2.songs << s4 << s5
u3.songs << s6 << s7
u4.songs << s8 << s9 << s10
u5.songs << s11 << s12 << s13
u6.songs << s14 << s15
