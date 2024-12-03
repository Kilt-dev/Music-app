import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import PlayerControls from '../components/PlayerControls';
import { playPauseAudio, stopAndUnloadSound ,toggleRepeat } from '../utils/AudioPlayerUtils';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const PlaySong = ({ route, navigation }) => {
  const { title, artist, url, artwork } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songsData, setSongsData] = useState([]);

  // Load songs data on mount
  useEffect(() => {
    const loadSongsData = async () => {
      try {
        const data = require('../assets/data.json');
        setSongsData(data);
      } catch (error) {
        console.error('Error loading songs data:', error);
      }
    };
    loadSongsData();
  }, []);

  // Cleanup sound on unmount
  useEffect(() => {
    return () => stopAndUnloadSound(sound);
  }, [sound]);

  // Update playback time every second
  useEffect(() => {
    let interval;
    if (sound) {
      interval = setInterval(async () => {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setCurrentTime(status.positionMillis / 1000);
            setDuration(status.durationMillis / 1000);
          }
        } catch (error) {
          console.error('Error updating playback time:', error);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sound]);

  const updateSong = async (newSong, index) => {
    try {
      const { title, artist, url, artwork } = newSong;
      await stopAndUnloadSound(sound);
      navigation.setParams({ title, artist, url, artwork });
      setCurrentSongIndex(index);
      await playPauseAudio(sound, url, isPlaying, setSound, setIsPlaying);
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  const handleSliderChange = async (value) => {
    if (sound) {
      try {
        await sound.setPositionAsync(value * 1000);
        setCurrentTime(value);
      } catch (error) {
        console.error('Error seeking audio:', error);
      }
    }
  };

  const handleNext = () => {
    if (isRepeat) {
      // Nếu repeat là true, lặp lại bài hát hiện tại
      updateSong(songsData[currentSongIndex], currentSongIndex);
    } else {
      // Nếu không có repeat, chuyển sang bài hát tiếp theo
      const nextIndex = isRandom
        ? Math.floor(Math.random() * songsData.length)
        : (currentSongIndex + 1) % songsData.length;
      updateSong(songsData[nextIndex], nextIndex);
    }
  };
  const handlePrevious = () => {
    const prevIndex = isRandom
      ? Math.floor(Math.random() * songsData.length)
      : (currentSongIndex - 1 + songsData.length) % songsData.length;
    updateSong(songsData[prevIndex], prevIndex);
  };
  const toggleRepeat = (isRepeat, setIsRepeat) => {
    setIsRepeat((prevRepeat) => !prevRepeat);
  };
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.songItem, index === currentSongIndex && styles.activeSong]}
      onPress={() => updateSong(item, index)}
    >
      <Image source={{ uri: item.artwork }} style={styles.songArtwork} />
      <View>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: artwork }} style={styles.artwork} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration || 1}
        value={currentTime}
        onValueChange={handleSliderChange}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#000000"
        thumbTintColor="#1EB1FC"
      />

      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={() => playPauseAudio(sound, url, isPlaying, setSound, setIsPlaying)}
        onSkipBack={handlePrevious}
        onSkipForward={handleNext}
        onRepeatToggle={() => setIsRepeat(!isRepeat)} // Toggle repeat
        onRandomToggle={() => setIsRandom(!isRandom)}
        isRepeat={isRepeat}
        isRandom={isRandom}
      />

      <FlatList
        data={songsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.songList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  artwork: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  artist: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  timeText: {
    fontSize: 14,
    color: '#555',
  },
  slider: {
    width: '80%',
    marginVertical: 20,
  },
  songList: {
    width: '100%',
    paddingHorizontal: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  activeSong: {
    backgroundColor: '#f0f8ff',
  },
  songArtwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  songArtist: {
    fontSize: 14,
    color: '#777',
  },
});

export default PlaySong;
