// components/PlayerControls.js
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react-native';

const PlayerControls = ({ 
  isPlaying, 
  onPlayPause, 
  onSkipBack, 
  onSkipForward, 
  onRepeatToggle, 
  onRandomToggle, 
  isRepeat, 
  isRandom 
}) => {
  return (
    <View style={styles.controls}>
      <View style={styles.leftControls}>
        {/* Repeat Button */}
        <TouchableOpacity onPress={onRepeatToggle} style={styles.iconContainer}>
          <Repeat size={24} color={isRepeat ? "#333" : "#ccc"} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.centerControls}>
        {/* Skip Back Button */}
        <TouchableOpacity onPress={onSkipBack} style={styles.iconContainer}>
          <SkipBack size={24} color="#333" style={styles.icon} />
        </TouchableOpacity>

        {/* Play/Pause Button */}
        <TouchableOpacity onPress={onPlayPause} style={styles.iconContainer}>
          {isPlaying ? (
            <Pause size={24} color="#333" style={styles.icon} />
          ) : (
            <Play size={24} color="#333" style={styles.icon} />
          )}
        </TouchableOpacity>

        {/* Skip Forward Button */}
        <TouchableOpacity onPress={onSkipForward} style={styles.iconContainer}>
          <SkipForward size={24} color="#333" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.rightControls}>
        {/* Random Button */}
        <TouchableOpacity onPress={onRandomToggle} style={styles.iconContainer}>
          <Shuffle size={24} color={isRandom ? "#333" : "#ccc"} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Chia đều không gian giữa các phần tử
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  leftControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginHorizontal: 10,  // Giãn cách giữa các nút
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default PlayerControls;
