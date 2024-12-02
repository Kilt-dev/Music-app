import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Search } from 'lucide-react-native'; // Icon từ Lucide
import { useNavigation } from '@react-navigation/native'; // Hook điều hướng

// Component cho từng bài hát
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
  const [searchText, setSearchText] = useState('');  // Trạng thái tìm kiếm
  const navigation = useNavigation(); // Hook điều hướng

  // Tải dữ liệu bài hát (có thể từ tệp JSON hoặc API)
  useEffect(() => {
    const jsonData = require('../assets/data.json');  // Dữ liệu từ tệp data.json
    setData(jsonData);
  }, []);

  // Hàm xử lý khi nhấn vào bài hát
  const handleSongPress = (song) => {
    // Điều hướng đến màn hình PlaySong và truyền dữ liệu bài hát
    navigation.navigate('PlaySong', {
      title: song.title,
      artist: song.artist,
      audioUrl: song.url,
      artwork: song.artwork,
    });
  };

  // Hàm lọc bài hát theo tìm kiếm
  const filteredData = data.filter(
    (song) =>
      song.title.toLowerCase().includes(searchText.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Thanh tìm kiếm */}
        <View style={styles.searchBar}>
          <TouchableOpacity>
            <Search size={24} color="#aaa" style={styles.searchIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm bài hát, nghệ sĩ..."
            value={searchText}
            onChangeText={setSearchText}  // Cập nhật trạng thái tìm kiếm
          />
        </View>

        {/* Banner hoặc quảng cáo */}
        <ScrollView horizontal style={styles.banner}>
          <Image source={require('../assets/posTN.png')} style={styles.bannerImage} />
          <Image source={require('../assets/posTN2.png')} style={styles.bannerImage} />
          <Image source={require('../assets/posTN.png')} style={styles.bannerImage} />
        </ScrollView>

        {/* Tiêu đề và danh sách bài hát */}
        <Text style={styles.sectionTitle}>Top Bài Hát</Text>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <SongItem item={item} onPress={handleSongPress} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}  
        />

        {/* Tiêu đề và danh sách album */}
        <Text style={styles.sectionTitle}>Album Mới</Text>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <SongItem item={item} onPress={handleSongPress} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* Tiêu đề và danh sách gợi ý riêng cho bạn */}
        <Text style={styles.sectionTitle}>Gợi Ý Riêng Cho Bạn</Text>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <SongItem item={item} onPress={handleSongPress} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* Tiêu đề và danh sách có thể bạn muốn nghe */}
        <Text style={styles.sectionTitle}>Có Thể Bạn Muốn Nghe</Text>
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
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 80, // Để tạo không gian cho footer
  },
  bannerImage: {
    width: 200,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: 16,
  },
  banner: {
    marginVertical: 10,
    height: 120,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingLeft: 20,
  },
  songItem: {
    marginRight: 20,
    width: 120,
    alignItems: 'center',
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  songTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 14,
    color: '#555',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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
    color: '#333',
  },
});

export default HomeScreen;
