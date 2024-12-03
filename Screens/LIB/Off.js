import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Off = ({ navigation }) => {
  const [offlineSongs, setOfflineSongs] = useState([]);

  useEffect(() => {
    const jsonData = require('../../assets/data.json');
    // Lọc các bài hát offline (được tải về)
    const offline = jsonData.filter(song => song.offline === true);
    setOfflineSongs(offline);
  }, []);

  const handleSongPress = (song) => {
    navigation.navigate('PlaySong', { 
      title: song.title, 
      artist: song.artist, 
      audioUrl: song.url, 
      artwork: song.artwork 
    });
  };

  const renderSong = ({ item }) => (
    <TouchableOpacity onPress={() => handleSongPress(item)}>
      <View style={styles.songItem}>
        <Image source={{ uri: item.artwork }} style={styles.artwork} />
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.artistName}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={offlineSongs}
        renderItem={renderSong}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  songItem: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  songTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  artistName: {
    color: '#aaa',
  },
});

export default Off;
