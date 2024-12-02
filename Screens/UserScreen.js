import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { Settings, Bell, ScanLine, EyeOff, ShieldBan, CircleChevronUp, Wifi } from 'lucide-react'; // Import icons from Lucide
import { TouchableOpacity, Text, View, Image, Button, ScrollView } from 'react-native'; // Import ScrollView
import { Dialog, Portal, Provider } from 'react-native-paper'; // Import Dialog components

const UserScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [visible, setVisible] = useState(false); // State to control Dialog visibility
  
  const navigation = useNavigation(); // Hook for navigation

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users/1');
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Text style={darkMode ? styles.loadingDark : styles.loading}>Loading...</Text>;
  }

  if (error) {
    return <Text style={darkMode ? styles.errorDark : styles.error}>{error}</Text>;
  }

  const handleNavigation = (screen) => {
    navigation.navigate(screen); // Navigate to the corresponding screen
  };

  const showDialog = () => setVisible(true); // Show Dialog
  const hideDialog = () => setVisible(false); // Hide Dialog

  const handleLogout = () => {
    console.log("Đang đăng xuất...");
    navigation.navigate('Splash'); // Navigate to SplashScreen
    hideDialog(); // Hide Dialog after logout
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={darkMode ? styles.containerDark : styles.container}>
        <View style={darkMode ? styles.headerDark : styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: userData.image }}
              style={styles.userImage}
            />
            <Text style={darkMode ? styles.userNameDark : styles.userName}>
              {userData.firstName} {userData.lastName}
            </Text>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity>
              <Bell style={darkMode ? styles.iconDark : styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Settings style={darkMode ? styles.iconDark : styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={darkMode ? styles.sectionTitleDark : styles.sectionTitle}>Dịch vụ</Text>
          <View style={styles.itemsContainer}>
            <TouchableOpacity style={darkMode ? styles.itemDark : styles.item}>
              <Wifi style={darkMode ? styles.sectionIconDark : styles.sectionIcon} />
              <Text style={darkMode ? styles.itemTextDark : styles.itemText}>Tiết kiệm 3G/4G truy cập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={darkMode ? styles.itemDark : styles.item}>
              <ScanLine style={darkMode ? styles.sectionIconDark : styles.sectionIcon} />
              <Text style={darkMode ? styles.itemTextDark : styles.itemText}>Nhập code</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={darkMode ? styles.sectionTitleDark : styles.sectionTitle}>Cá Nhân</Text>
          <View style={styles.itemsContainer}>
            <TouchableOpacity
              style={darkMode ? styles.itemDark : styles.item}
              onPress={() => handleNavigation('DSQuanTam')} // Navigate to "Danh sách quan tâm"
            >
              <CircleChevronUp style={darkMode ? styles.sectionIconDark : styles.sectionIcon} />
              <Text style={darkMode ? styles.itemTextDark : styles.itemText}>Danh sách quan tâm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={darkMode ? styles.itemDark : styles.item}
              onPress={() => handleNavigation('DSChan')} // Navigate to "Danh sách chặn"
            >
              <ShieldBan style={darkMode ? styles.sectionIconDark : styles.sectionIcon} />
              <Text style={darkMode ? styles.itemTextDark : styles.itemText}>Danh sách chặn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={darkMode ? styles.itemDark : styles.item}
              onPress={() => handleNavigation('DSTamAn')} // Navigate to "Danh sách tạm ẩn"
            >
              <EyeOff style={darkMode ? styles.sectionIconDark : styles.sectionIcon} />
              <Text style={darkMode ? styles.itemTextDark : styles.itemText}>Danh sách tạm ẩn</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.toggleButtonContainer}>
          <Button
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            onPress={() => setDarkMode(!darkMode)}
            color={darkMode ? '#007bff' : '#333'}
          />
          <Button
            title="Logout"
            onPress={showDialog} // Show dialog on button press
            color={darkMode ? '#007bff' : '#333'}
          />
        </View>

        {/* Dialog for logout confirmation */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Xác nhận đăng xuất</Dialog.Title>
            <Dialog.Content>
              <Text>Bạn có chắc chắn muốn đăng xuất không?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button  style={{ fontSize: 30, paddingVertical: 12, paddingHorizontal: 20 }}onPress={hideDialog}>Hủy</Button>
              <Button  style={{ fontSize: 30, paddingVertical: 12, paddingHorizontal: 20 }}onPress={handleLogout}>Đăng xuất</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </Provider>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  containerDark: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
    color: '#eaeaea',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    marginBottom: 20,
  },
  headerDark: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    marginBottom: 20,
  },
  icons: {
    flexDirection: 'row',
    gap: 20,
  },
  icon: {
    fontSize: 28,
    color: 'black',
    cursor: 'pointer',
  },
  iconDark: {
    fontSize: 28,
    color: '#eaeaea',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
  },
  userNameDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#eaeaea',
    marginLeft: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginBottom: 15,
  },
  sectionTitleDark: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  itemsContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemDark: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  sectionIcon: {
    fontSize: 24,
    color: '#333',
    marginRight: 15,
  },
  sectionIconDark: {
    fontSize: 24,
    color: '#eaeaea',
    marginRight: 15,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemTextDark: {
    fontSize: 16,
    color: '#eaeaea',
  },
  toggleButtonContainer: {
    marginTop: 20,
  },
  loading: {
    fontSize: 20,
    textAlign: 'center',
  },
  loadingDark: {
    fontSize: 20,
    textAlign: 'center',
    color: '#eaeaea',
  },
  error: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
  errorDark: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    color: '#eaeaea',
  },
};

export default UserScreen;
