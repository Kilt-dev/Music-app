import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const NgheSi = ({ navigation }) => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const jsonData = require('../../assets/data.json');
    // Nhóm các bài hát theo nghệ sĩ
    const artistList = jsonData.reduce((acc, song) => {
      if (!acc[song.artist]) {
        acc[song.artist] = [];
      }
      acc[song.artist].push(song);
      return acc;
    }, {});

    setArtists(artistList);
  }, []);

  const handleSongPress = (song) => {
    navigation.navigate('PlaySong', { title: song.title, artist: song.artist, audioUrl: song.url, artwork: song.artwork });
  };

  const renderArtist = ({ item }) => (
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
      {Object.keys(artists).map((artist, index) => (
        <View key={index} style={styles.artistSection}>
          <Text style={styles.artistHeader}>{artist}</Text>
          <FlatList
            data={artists[artist]}
            renderItem={renderArtist}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
  },
  artistSection: {
    marginBottom: 20,
  },
  artistHeader: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  songItem: {
    flexDirection: 'row',
    marginRight: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 10,
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
});

export default NgheSi;
