import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DSQuanTam = () => {
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
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DSQuanTam;
