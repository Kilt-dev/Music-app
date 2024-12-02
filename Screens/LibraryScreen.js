import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Heart, Download, CloudOff, Upload, Music, User, Video } from 'lucide-react-native'; // Import icons from Lucide

const LibraryScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  // Simulate static data for lists like favorites, downloads, etc.
  const items = [
    { id: 1, title: 'Bài hát yêu thích', icon: <Heart size={24} color="#ff4081" /> },
    { id: 2, title: 'Đã tải', icon: <Download size={24} color="#4CAF50" /> },
    { id: 3, title: 'Offline', icon: <CloudOff size={24} color="#607d8b" /> },
    { id: 4, title: 'Upload', icon: <Upload size={24} color="#9e9e9e" /> },
    { id: 5, title: 'MV', icon: <Video size={24} color="#f44336" /> },
    { id: 6, title: 'Nghệ sỹ', icon: <User size={24} color="#3f51b5" /> },
  ];

  // Fetch the data from the JSON file on component mount
  useEffect(() => {
    try {
      const jsonData = require('../assets/data.json');  // Assuming the path to the JSON file
      setData(jsonData);
    } catch (error) {
      console.error("Error loading JSON data: ", error);
    }
  }, []); // Only run on component mount

  // Handle song press event
  const handleSongPress = (song) => {
    // Navigate to PlaySong screen and pass the song data
    navigation.navigate('PlaySong', {  
      title: song.title,
      artist: song.artist,
      audioUrl: song.audioUrl,
      artwork: song.artwork,
    });
  };

  // Render each "recent play" item with song artwork, title, and artist
  const renderRecentPlay = ({ item }) => (
    <TouchableOpacity onPress={() => handleSongPress(item)} accessible={true} accessibilityLabel={`Play ${item.title}`}>
      <View style={styles.recentItem}>
        <Image source={{ uri: item.artwork }} style={styles.artwork} />
        <Text style={styles.recentTitle}>{item.title}</Text>
        <Text style={styles.artistName}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render each library item like "Bài hát yêu thích", "Đã tải", etc.
  const renderItem = ({ item }) => (
    <View style={styles.libraryItem}>
      <View style={styles.itemContent}>
        {item.icon}
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* List of categories like favorites, downloads, MV, etc. */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.libraryList}
      />

      {/* "Recently Played" section title */}
      <Text style={styles.sectionTitle}>Nghe gần đây</Text>
      <FlatList
        data={data}  // Use data from the JSON file
        renderItem={renderRecentPlay}
        keyExtractor={(item) => item.id.toString()}
        style={styles.recentList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  libraryList: {
    marginVertical: 10,
  },
  libraryItem: {
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: 100,
  },
  itemContent: {
    alignItems: 'center',
  },
  itemText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingLeft: 20,
  },
  recentList: {
    paddingLeft: 20,
  },
  recentItem: {
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  artistName: {
    fontSize: 14,
    color: '#555',
  },
});

export default LibraryScreen;