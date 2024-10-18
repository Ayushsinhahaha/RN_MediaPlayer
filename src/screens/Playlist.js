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
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {songs} from '../data';
const {width} = Dimensions.get('window');

const Playlist = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  return (
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
        {/* <Text style={styles.headerText}>Songs from Sukoon Playlist</Text> */}
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
            style={{padding: 14, borderWidth: 1, backgroundColor: 'lightgrey'}}>
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

      {/* Spotify logo and playlist name */}
      <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
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
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 30,
        }}></View>

      {/* songs list */}
      <FlatList
        data={songs}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                // height: 50,
                width: width,
                // justifyContent: 'space-between',
                marginLeft: 20,
                marginBottom: 20,
              }}>
              <Image source={item.image} style={{height: 60, width: 60}} />
              <View style={{marginLeft: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 280,
                  }}>
                  <Text style={{fontSize: 18, color: 'grey', fontWeight: 800}}>
                    {item.title}
                  </Text>
                  <Text style={{color: 'grey', fontWeight: '800'}}>...</Text>
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
