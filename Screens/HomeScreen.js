import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Search } from 'lucide-react-native'; // Icon from Lucide
import { useNavigation } from '@react-navigation/native'; // Navigation hook

// Component for each song
const SongItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} accessible={true} accessibilityLabel={`Play ${item.title}`}>
    <View style={styles.songItem}>
      <Image source={{ uri: item.artwork }} style={styles.albumImage} />
      <Text style={styles.songTitle}>{item.title}</Text>
      <Text style={styles.artistName}>{item.artist}</Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  // Fetching song data (could be from a JSON file or API)
  useEffect(() => {
    const jsonData = require('../assets/data.json');
    setData(jsonData);
  }, []);

  // Handling song press event
  const handleSongPress = (song) => {
    navigation.navigate('PlaySong', {
      title: song.title,
      artist: song.artist,
      audioUrl: song.url,
      artwork: song.artwork,
    });
  };

  // Filtering songs based on search
  const filteredData = data.filter(
    (song) =>
      song.title.toLowerCase().includes(searchText.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search bar */}
        <View style={styles.searchBar}>
          <Search size={24} color="#fff" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search songs, artists..."
            placeholderTextColor="#fff"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Banner/Ads */}
        <ScrollView horizontal style={styles.banner}>
          <Image source={require('../assets/posTN.png')} style={styles.bannerImage} />
          <Image source={require('../assets/posTN2.png')} style={styles.bannerImage} />
          <Image source={require('../assets/posTN.png')} style={styles.bannerImage} />
        </ScrollView>

        {/* Top Songs */}
        <Text style={styles.sectionTitle}>Top Songs</Text>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <SongItem item={item} onPress={handleSongPress} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* New Albums */}
        <Text style={styles.sectionTitle}>New Albums</Text>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <SongItem item={item} onPress={handleSongPress} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* Personalized Suggestions */}
        <Text style={styles.sectionTitle}>Suggestions for You</Text>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <SongItem item={item} onPress={handleSongPress} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* You Might Like */}
        <Text style={styles.sectionTitle}>You Might Like</Text>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <SongItem item={item} onPress={handleSongPress} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background for a modern feel
  },
  scrollContent: {
    paddingBottom: 80, // Create space for footer
  },
  bannerImage: {
    width: 250,
    height: 120,
    borderRadius: 10,
    marginHorizontal: 5,
    resizeMode: 'cover',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 30,
    margin: 15,
    paddingHorizontal: 20,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  banner: {
    marginVertical: 10,
    height: 140,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 15,
    paddingLeft: 20,
  },
  songItem: {
    marginRight: 20,
    width: 140,
    alignItems: 'center',
    backgroundColor: '#1c1c1c', // Card background for each song
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  albumImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#aaa',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#222',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default HomeScreen;
