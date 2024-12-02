import { Audio } from 'expo-av';

// Hàm cập nhật thanh thời gian
export const updateTime = (sound, setCurrentTime, setDuration) => {
  if (sound) {
    sound.getStatusAsync().then((status) => {
      if (status.isLoaded) {
        setCurrentTime(status.positionMillis / 1000); // Cập nhật thời gian hiện tại
        setDuration(status.durationMillis / 1000); // Cập nhật thời gian tổng
      }
    });
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


// Dừng và giải phóng tài nguyên âm thanh
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


// Hàm Repeat (Lặp lại bài hát)
export const toggleRepeat = (isRepeat, setIsRepeat) => {
  setIsRepeat(!isRepeat);
};

// Hàm Random (Phát bài hát ngẫu nhiên)
export const toggleRandom = (isRandom, setIsRandom) => {
  setIsRandom(!isRandom);
};

// Hàm xử lý bài hát kế tiếp
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
// Hàm xử lý bài hát trước đó
export const handlePrevious = async (sound, songs, currentSongIndex, setSound, setIsPlaying, setCurrentSongIndex) => {
  try {
    const previousIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Chuyển đến bài trước
    const previousSong = songs[previousIndex];

    // Dừng và giải phóng tài nguyên âm thanh hiện tại nếu có
    if (sound) {
      await stopAndUnloadSound(sound);
    }

    // Tải và phát bài hát trước đó
    const { sound: newSound, status } = await Audio.Sound.createAsync(
      { uri: previousSong.uri },
      { shouldPlay: true }
    );

    // Kiểm tra trạng thái âm thanh đã được tải chưa trước khi phát
    if (status.isLoaded) {
      setSound(newSound);
      setIsPlaying(true);
      setCurrentSongIndex(previousIndex);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } else {
      console.error('Cannot play previous song because sound is not loaded');
    }
  } catch (error) {
    console.error('Error playing previous song:', error);
  }
};
