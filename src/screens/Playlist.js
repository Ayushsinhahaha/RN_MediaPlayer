import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {songs} from '../data';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import SongPlayer from '../../SongPlayer';
const {width} = Dimensions.get('window');

const Playlist = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isVisible, setIsVisible] = useState(false);
  console.log(State.Playing);
  console.log(playbackState.state);
  console.log(State.Playing == playbackState.state);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add(songs);
    } catch (error) {
      console.log('error in setupplayer', error);
    }
  };
  useEffect(() => {
    setupPlayer();
  }, []);

  useEffect(() => {
    if (State.Playing == playbackState.state) {
      if (progress.position.toFixed(0) == progress.duration.toFixed(0)) {
        if (currentIndex < songs.length) {
          setCurrentIndex(currentIndex + 1);
        }
      }
    }
  }, [progress]);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              color={'#000'}
              size={28}
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
        </View>

        {/* Search options */}
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {/* for the search bar, this is the view */}
          <View
            style={{
              flexDirection: 'row',
              width: width - 100,
              borderWidth: 1,
              backgroundColor: 'lightgrey',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Icon
                name="search"
                size={24}
                color={'dodgerblue'}
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Find in Playlist"
              placeholderTextColor={'#000'}
              style={{fontWeight: '800', width: 120, marginLeft: 20}}
            />
          </View>
          {/* sort button */}
          <View style={{marginLeft: 6}}>
            <TouchableOpacity
              style={{
                padding: 14,
                borderWidth: 1,
                backgroundColor: 'lightgrey',
              }}>
              <Text style={{color: '#000', fontWeight: '800'}}>Sort</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Playlist Image */}
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Image
            source={songs[currentIndex].image}
            style={{height: 350, width: 350, borderRadius: 20}}
          />
        </View>

        <Text
          style={{
            color: 'grey',
            marginLeft: 20,
            marginTop: 20,
            fontSize: 28,
            fontWeight: 800,
          }}>
          {songs[currentIndex].title}
        </Text>

        {/* Spotify logo and playlist name */}
        <View
          style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
          <Image
            source={require('../../assets/logo/spotifylogo.png')}
            style={{height: 30, width: 30, marginLeft: 20}}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '800',
              color: '#000',
              marginLeft: 10,
            }}>
            Sukoon Playlist
          </Text>
        </View>
        {/* duration and number of saves */}
        <View style={{flexDirection: 'row', marginLeft: 24, marginTop: 6}}>
          <Text style={{fontSize: 14, color: '#000', fontWeight: '700'}}>
            20,221 saves
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#000',
              marginLeft: 18,
              fontWeight: '700',
            }}>
            2h 36m
          </Text>
        </View>

        {/* download icons and play icon green color */}
        <View
          style={{
            height: 40,
            width: width - 50,
            // borderWidth: 1,
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={async () => {
              if (State.Playing == playbackState.state) {
                await TrackPlayer.pause();
              } else {
                await TrackPlayer.skip(currentIndex);
                await TrackPlayer.play();
              }
            }}
            style={{alignSelf: 'flex-end'}}>
            {State.Playing == playbackState.state ? (
              <Image
                source={require('../../assets/logo/pause.png')}
                style={{height: 30, width: 30}}
              />
            ) : (
              <Image
                source={require('../../assets/logo/play.png')}
                style={{height: 30, width: 30}}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* songs list */}
        <FlatList
          data={songs}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  await TrackPlayer.pause();
                  await TrackPlayer.skip(index);
                  await TrackPlayer.play();
                  setCurrentIndex(index);
                }}
                style={{
                  flexDirection: 'row',
                  width: width,
                  marginLeft: 20,
                  marginBottom: 20,
                }}>
                <Image source={item.image} style={{height: 60, width: 60}} />
                <View style={{marginLeft: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 280,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'grey',
                        fontWeight: 800,
                        textAlign: 'left',
                      }}>
                      {item.title}
                    </Text>
                    <Text style={{color: 'grey', fontWeight: '800'}}>...</Text>
                    {index == currentIndex &&
                      State.Playing == playbackState.state && (
                        <Image
                          source={require('../../assets/logo/beats.jpg')}
                          style={{
                            height: 30,
                            width: 30,
                            marginLeft: 80,
                            color: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        />
                      )}
                  </View>
                  <Text style={{fontSize: 14, color: 'grey', fontWeight: 600}}>
                    {item.artist}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setIsVisible(true)}
        style={{
          height: 80,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={songs[currentIndex].image}
            style={{
              height: 60,
              width: 60,
              alignSelf: 'center',
              marginLeft: 30,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              // alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 25,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'grey',
                fontWeight: 800,
                // textAlign: 'center',
              }}>
              {songs[currentIndex].title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'grey',
                fontWeight: 600,
                // textAlign: 'center',
              }}>
              {songs[currentIndex].artist}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={async () => {
            if (State.Playing == playbackState.state) {
              await TrackPlayer.pause();
            } else {
              // await TrackPlayer.skip(currentIndex);
              await TrackPlayer.play();
            }
          }}
          style={{
            backgroundColor: '#fff',
            height: 40,
            width: 40,
            borderRadius: 20,
            marginTop: 15,
            marginRight: 10,
          }}>
          {State.Playing == playbackState.state ? (
            <Image
              source={require('../../assets/logo/pause.png')}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
            />
          ) : (
            <Image
              source={require('../../assets/logo/plays.png')}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
      <SongPlayer
        songs={songs}
        currentIndex={currentIndex}
        playbackState={playbackState}
        progress={progress}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </View>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {},
  header: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    marginTop: 20,
  },
  headerText: {
    color: '#000',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '800',
  },
  topBar: {
    flexDirection: 'row',
  },
});
