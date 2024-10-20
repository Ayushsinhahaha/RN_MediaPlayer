import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import TrackPlayer, {State} from 'react-native-track-player';

const SongPlayer = ({
  songs,
  currentIndex,
  progress,
  playbackState,
  isVisible,
  onClose,
  onChange,
}) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(currentIndex);

  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <Modal style={{margin: 0}} isVisible={isVisible}>
      <View style={{backgroundColor: 'dodgerblue', flex: 1}}>
        {/* Header */}
        <TouchableOpacity
          onPress={() => onClose()}
          style={{height: 60, width: '100%'}}>
          <Image
            source={require('./assets/logo/down-arrow.png')}
            style={{height: 30, width: 30, margin: 10}}
          />
        </TouchableOpacity>

        {/* Banner */}
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Image
            source={songs[currentSongIndex].image}
            style={{height: 350, width: 350}}
          />
        </View>

        {/* Song title and artist name */}
        <View style={{marginLeft: 40, marginTop: 25}}>
          <Text
            style={{
              fontSize: 28,
              color: 'black',
              fontWeight: 800,
              textAlign: 'left',
            }}>
            {songs[currentSongIndex].title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              fontWeight: 600,
              marginTop: 5,
            }}>
            {songs[currentSongIndex].artist}
          </Text>
        </View>

        {/* Slider */}
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Slider
            style={{width: 350, height: 40}}
            minimumValue={progress.position}
            maximumValue={progress.duration}
            minimumTrackTintColor="#ffffff"
            maximumTrackTintColor="#fff"
          />
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#fff', marginLeft: 10}}>
              {format(progress.position)}
            </Text>
            <Text style={{color: '#fff', marginRight: 10}}>
              {format(progress.duration)}
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={async () => {
              if (currentSongIndex > 0) {
                await TrackPlayer.skip(currentSongIndex - 1);
                await TrackPlayer.play();
                setCurrentSongIndex(currentSongIndex - 1);
                onChange(currentSongIndex - 1);
              }
            }}>
            <Image
              source={require('./assets/logo/previous.png')}
              style={{height: 70, width: 70}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              if (State.Playing == playbackState.state) {
                await TrackPlayer.pause();
              } else {
                await TrackPlayer.skip(currentIndex);
                await TrackPlayer.play();
              }
            }}>
            <Image
              source={
                State.Playing == playbackState.state
                  ? require('./assets/logo/pausee.png')
                  : require('./assets/logo/play-button-arrowhead.png')
              }
              style={{height: 70, width: 70}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              if (currentSongIndex <= songs.length - 1) {
                await TrackPlayer.skip(currentSongIndex + 1);
                await TrackPlayer.play();
                setCurrentSongIndex(currentSongIndex + 1);
                onChange(currentSongIndex + 1);
              }
            }}>
            <Image
              source={require('./assets/logo/next-button.png')}
              style={{height: 50, width: 50}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SongPlayer;

const styles = StyleSheet.create({});
