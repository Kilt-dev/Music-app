import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DSTamAn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Danh sách trống</Text>
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
  text: {
    fontSize: 18,
    fontWeight: 'medium',
    color : "gray"
  },
});

export default DSTamAn;
