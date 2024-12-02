import { Audio } from 'expo-av';

// Hàm cập nhật thanh thời gian
export const updateTime = (sound, setCurrentTime, setDuration) => {
  sound.getStatusAsync().then((status) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);  // Thời gian hiện tại
      setDuration(status.durationMillis / 1000);    // Tổng thời gian của bài hát
    }
  });
};

// Hàm thay đổi thời gian phát khi người dùng kéo thanh thời gian
export const seekAudio = async (sound, value, setCurrentTime) => {
  try {
    await sound.setPositionAsync(value * 1000); // Chuyển đổi giây thành milliseconds
    setCurrentTime(value);
  } catch (error) {
    console.error("Error seeking audio:", error);
  }
};

// Hàm phát và tạm dừng âm thanh
export const playPauseAudio = async (sound, audioUrl, isPlaying, setSound, setIsPlaying, setCurrentSongIndex, index) => {
  try {
    if (sound && isPlaying && sound._loaded) {
      await sound.pauseAsync();
      setIsPlaying(false);
      return;
    }

    if (sound && !isPlaying && sound._loaded) {
      await sound.playAsync();
      setIsPlaying(true);
      return;
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audioUrl },
      { shouldPlay: true }
    );

    setSound(newSound);
    setIsPlaying(true);
    setCurrentSongIndex(index);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    });
  } catch (error) {
    console.log('Error playing audio:', error);
  }
};

// Hàm updatePlaybackStatus sẽ nhận status và cập nhật thời gian hiện tại và tổng thời gian
export const updatePlaybackStatus = (status, setCurrentTime, setDuration) => {
  if (status.isLoaded) {
    setCurrentTime(status.positionMillis / 1000);  // Cập nhật thời gian hiện tại
    setDuration(status.durationMillis / 1000);    // Cập nhật tổng thời gian
  }
};

// Hàm dừng và giải phóng âm thanh
export const stopAndUnloadSound = async (sound) => {
  try {
    if (sound && sound._loaded) {
      await sound.stopAsync();
      await sound.unloadAsync();
      console.log('Sound stopped and unloaded successfully');
    } else {
      console.log('Error: Sound is not loaded or already unloaded, cannot stop or unload');
    }
  } catch (error) {
    console.log('Error stopping and unloading sound:', error);
  }
};

// Hàm Repeat (Lặp lại)
export const toggleRepeat = (sound, isRepeat, setIsRepeat) => {
  if (isRepeat) {
    // Tắt tính năng lặp lại
    sound.setOnPlaybackStatusUpdate(null); // Xóa sự kiện khi hoàn thành
    setIsRepeat(false);
  } else {
    // Bật tính năng lặp lại
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        // Khi bài hát kết thúc, phát lại từ đầu
        sound.setPositionAsync(0);
        sound.playAsync();
      }
    });
    setIsRepeat(true);
  }
};

// Hàm Random (Ngẫu nhiên)
export const playRandomSong = async (songs, setSound, setIsPlaying, setCurrentSongIndex, setIsRandom, sound) => {
  try {
    if (songs.length > 0) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      const randomSong = songs[randomIndex];

      if (sound && sound._loaded) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: randomSong.uri },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);
      setCurrentSongIndex(randomIndex);
      setIsRandom(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    }
  } catch (error) {
    console.log('Error playing random song:', error);
  }
};

// Hàm xử lý cho Next (khi có chế độ Repeat hoặc Random)
export const handleNext = async (
  sound,
  songs,
  setSound,
  setIsPlaying,
  setCurrentSongIndex,
  currentSongIndex,
  isRepeat,
  isRandom
) => {
  try {
    if (isRepeat) {
      // Nếu Repeat bật, phát lại bài hát hiện tại từ đầu
      sound.setPositionAsync(0);
      sound.playAsync();
    } else if (isRandom) {
      // Nếu Random bật, chọn một bài hát ngẫu nhiên từ danh sách
      const randomIndex = Math.floor(Math.random() * songs.length);
      const randomSong = songs[randomIndex];

      if (sound && sound._loaded) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: randomSong.uri },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);
      setCurrentSongIndex(randomIndex);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } else {
      // Nếu không có Repeat hay Random, chuyển đến bài hát tiếp theo
      const nextIndex = (currentSongIndex + 1) % songs.length;
      const nextSong = songs[nextIndex];

      if (sound && sound._loaded) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: nextSong.uri },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);
      setCurrentSongIndex(nextIndex);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    }
  } catch (error) {
    console.log('Error handling next:', error);
  }
};