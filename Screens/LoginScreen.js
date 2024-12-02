import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Disc3 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { login, getAllUsers } from '../api'; // Import các hàm từ api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể tải danh sách người dùng');
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = async () => {
    try {
      // Gọi hàm login để lấy Access Token
      const accessToken = await login(username, password);
  
      // In Access Token ra console (được thực hiện trong hàm login rồi)
      console.log('Access Token trong LoginScreen:', accessToken);
  
      // Thông báo cho người dùng đăng nhập thành công
      Alert.alert('Đăng nhập thành công', 'Bạn đã đăng nhập thành công!');
  
      // Chuyển sang màn hình khác sau khi đăng nhập thành công
      navigation.navigate('TabNavigator');
    } catch (error) {
      Alert.alert('Lỗi', 'Tên người dùng hoặc mật khẩu không đúng');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Disc3 size={100} color="#F179B8" />
        <Text style={styles.appName}>Music Luci</Text>
      </View>
      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>

      <View style={styles.userList}>
        <Text style={styles.subtitle}>Danh sách người dùng:</Text>
        {users.map(user => (
          <Text key={user.id} style={styles.userItem}>
            {user.username} - {user.email}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DBDFEB',
    marginTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 15,
    color: '#1E90FF',
    textAlign: 'center',
  },
  userList: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userItem: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default LoginScreen;
