import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';  // Tạo yêu cầu cho tài liệu

const Upload = ({ navigation }) => {
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [songFile, setSongFile] = useState(null);

  const handleUpload = async () => {
    if (!songTitle || !songArtist || !songFile) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin và chọn file bài hát.');
      return;
    }
    
    // Upload file
    try {
      // Xử lý upload bài hát (ví dụ: upload lên server hoặc lưu vào bộ nhớ cục bộ)
      console.log('Uploading song...', songTitle, songArtist, songFile.uri);
      Alert.alert('Thông báo', 'Bài hát đã được tải lên thành công!');
      
      // Điều hướng hoặc làm gì đó sau khi upload thành công
      navigation.goBack();
    } catch (error) {
      console.error('Error uploading song:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải bài hát.');
    }
  };

  const pickSongFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });
      
      if (result.type === 'success') {
        setSongFile(result);
      }
    } catch (error) {
      console.log('Document picker error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tải bài hát lên</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Tên bài hát"
        value={songTitle}
        onChangeText={setSongTitle}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Tên nghệ sĩ"
        value={songArtist}
        onChangeText={setSongArtist}
      />
      
      <TouchableOpacity style={styles.uploadButton} onPress={pickSongFile}>
        <Text style={styles.uploadButtonText}>
          {songFile ? 'File đã chọn: ' + songFile.name : 'Chọn file bài hát'}
        </Text>
      </TouchableOpacity>
      
      <Button title="Tải lên" onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#1e1e1e',
    color: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  uploadButton: {
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
  },
});

export default Upload;
