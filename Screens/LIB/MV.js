import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MV = ({ navigation }) => {
  const [mvSongs, setMvSongs] = useState([]);

  useEffect(() => {
    const jsonData = require('../../assets/data.json');
    // Lọc ra các bài hát loại MV
    const mv = jsonData.filter(song => song.type === 'MV');
    setMvSongs(mv);
  }, []);

  const handleSongPress = (song) => {
    navigation.navigate('PlaySong', { title: song.title, artist: song.artist, audioUrl: song.url, artwork: song.artwork });
  };

  const renderSong = ({ item }) => (
    <TouchableOpacity onPress={() => handleSongPress(item)}>
      <View style={styles.songItem}>
        <Image source={{ uri: item.artwork }} style={styles.artwork} />
        <View style={styles.textContainer}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.artistName}>{item.artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {mvSongs.length > 0 ? (
        <FlatList
          data={mvSongs}
          renderItem={renderSong}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noMvs}>No MV songs available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
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
  textContainer: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  artistName: {
    color: '#aaa',
    fontSize: 14,
  },
  noMvs: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default MV;
