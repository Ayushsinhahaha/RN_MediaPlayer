import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Homepage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Playlist Page"
        onPress={() => navigation.navigate('Playlist')}
      />
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
