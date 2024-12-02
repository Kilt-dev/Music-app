// PlaySong.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'; 
import Slider from '@react-native-community/slider';
import PlayerControls from '../components/PlayerControls';
import { playPauseAudio, stopAndUnloadSound, seekAudio } from '../utils/AudioPlayerUtils';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${formattedMinutes}:${formattedSeconds}`;
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

  useEffect(() => {
    const data = require('../assets/data.json');
    setSongsData(data);
  }, []);

  useEffect(() => {
    if (sound) {
      const interval = setInterval(() => {
        sound.getStatusAsync().then((status) => {
          if (status.isLoaded) {
            setCurrentTime(status.positionMillis / 1000); 
            setDuration(status.durationMillis / 1000);    
          }
        });
      }, 1000);  

      return () => clearInterval(interval);  
    }
  }, [sound]);

  const updateSong = async (newSong, index) => {
    const { title, artist, url, artwork } = newSong;
    await stopAndUnloadSound(sound);
    playPauseAudio(sound, url, isPlaying, setSound, setIsPlaying, setCurrentSongIndex, index, isRepeat, isRandom, songsData);
    navigation.setParams({ title, artist, url, artwork });
    setCurrentSongIndex(index);
  };

  const handleSliderChange = async (value) => {
    if (sound) {
      try {
        await sound.setPositionAsync(value * 1000); // Seek to the position in milliseconds
        setCurrentTime(value); // Update current time
      } catch (error) {
        console.error("Error seeking audio:", error);
      }
    }
  };
  
  const goToNext = () => {
    const nextIndex = (currentSongIndex + 1) % songsData.length;
    updateSong(songsData[nextIndex], nextIndex);
  };

  const goToPrevious = () => {
    const previousIndex = (currentSongIndex - 1 + songsData.length) % songsData.length;
    updateSong(songsData[previousIndex], previousIndex);
  };

  const toggleRepeat = () => setIsRepeat(!isRepeat);
  const toggleRandom = () => setIsRandom(!isRandom);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.songItem, index === currentSongIndex && { backgroundColor: '#f0f8ff' }]}
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
        maximumValue={duration}
        value={currentTime}
        onValueChange={handleSliderChange}  
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#000000"
        thumbTintColor="#1EB1FC"
      />

      <PlayerControls 
        isPlaying={isPlaying}
        onPlayPause={() => playPauseAudio(sound, url, isPlaying, setSound, setIsPlaying, setCurrentSongIndex, currentSongIndex, isRepeat, isRandom, songsData)}
        onSkipBack={goToPrevious}
        onSkipForward={goToNext}
        onRepeatToggle={toggleRepeat}
        onRandomToggle={toggleRandom}
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
    justifyContent: 'center',
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
  songList: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  timeText: {
    fontSize: 14,
    color: '#555',
  },
  slider: {
    width: '80%',
    marginVertical: 20,
  },
});

export default PlaySong;