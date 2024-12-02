import React, { useState, useEffect } from 'react';
import { View, Slider } from 'react-native';
import { Audio } from 'expo-av';
import { updateTime, seekAudio } from './utils/audioPlayerUtils'; // Giả sử bạn đã có utils này

const AudioPlayer = ({ audioUrl }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);  // Thời gian hiện tại
  const [duration, setDuration] = useState(0);  // Tổng thời gian

  useEffect(() => {
    // Khi âm thanh được tải vào và chơi
    const loadAudio = async () => {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false }
        );
        setSound(newSound);
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setCurrentTime(status.positionMillis / 1000); // Thời gian hiện tại
            setDuration(status.durationMillis / 1000); // Tổng thời gian
          }
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      } catch (error) {
        console.log('Error loading audio:', error);
      }
    };
    
    loadAudio();

    return () => {
      // Hủy âm thanh khi component bị unmount
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    // Cập nhật thời gian mỗi khi đang phát
    if (sound && isPlaying) {
      const interval = setInterval(() => {
        updateTime(sound, setCurrentTime, setDuration);
      }, 1000); // Cập nhật mỗi giây
      return () => clearInterval(interval);  // Hủy interval khi component bị unmount hoặc âm thanh dừng
    }
  }, [sound, isPlaying]);

  const handleSliderChange = async (value) => {
    if (sound) {
      await seekAudio(sound, value, setCurrentTime); // Gọi hàm seek để thay đổi vị trí phát
    }
  };

  const playPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <View>
      {/* Slider để di chuyển thời gian phát */}
      <Slider
        value={currentTime}
        minimumValue={0}
        maximumValue={duration}
        onValueChange={handleSliderChange}
      />
      {/* Play/Pause Button */}
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={playPause} />
    </View>
  );
};

export default AudioPlayer;
