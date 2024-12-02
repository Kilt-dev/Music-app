import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings, Bell, ScanLine, EyeOff, ShieldBan, CircleChevronUp, Wifi } from 'lucide-react'; // Import icons from Lucide
import { TouchableOpacity } from 'react-native';

const UserScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users/1'); // DummyJSON API
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
    return <div style={darkMode ? styles.loadingDark : styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={darkMode ? styles.errorDark : styles.error}>{error}</div>;
  }

  return (
    <div style={darkMode ? styles.containerDark : styles.container}>
      <div style={darkMode ? styles.headerDark : styles.header}>
        <div style={styles.userInfo}>
          <img
            src={userData.image}
            alt="User"
            style={styles.userImage}
          />
          <h2 style={darkMode ? styles.userNameDark : styles.userName}>
            {userData.firstName} {userData.lastName}
          </h2>
        </div>
        <div style={styles.icons}>
          <TouchableOpacity>
            <Bell style={darkMode ? styles.iconDark : styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Settings style={darkMode ? styles.iconDark : styles.icon} />
          </TouchableOpacity>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={darkMode ? styles.sectionTitleDark : styles.sectionTitle}>Dịch vụ</h3>
        <div style={styles.itemsContainer}>
          <TouchableOpacity style={darkMode ? styles.itemDark : styles.item}>
            <Wifi style={darkMode ? styles.sectionIconDark : styles.sectionIcon} />
            <span style={darkMode ? styles.itemTextDark : styles.itemText}>Tiết kiệm 3G/4G truy cập</span>
          </TouchableOpacity>
          <TouchableOpacity style={darkMode ? styles.itemDark : styles.item}>
            <ScanLine style={darkMode ? styles.sectionIconDark : styles.sectionIcon} />
            <span style={darkMode ? styles.itemTextDark : styles.itemText}>Nhập code</span>
          </TouchableOpacity>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={darkMode ? styles.sectionTitleDark : styles.sectionTitle}>Cá Nhân</h3>
        <div style={styles.itemsContainer}>
          <TouchableOpacity style={darkMode ? styles.itemDark : styles.item}>
            <CircleChevronUp style={darkMode ? styles.sectionIconDark : styles.sectionIcon} />
            <span style={darkMode ? styles.itemTextDark : styles.itemText}>Danh sách quan tâm</span>
          </TouchableOpacity>
          <TouchableOpacity style={darkMode ? styles.itemDark : styles.item}>
            <ShieldBan style={darkMode ? styles.sectionIconDark : styles.sectionIcon} />
            <span style={darkMode ? styles.itemTextDark : styles.itemText}>Danh sách chặn</span>
          </TouchableOpacity>
          <TouchableOpacity style={darkMode ? styles.itemDark : styles.item}>
            <EyeOff style={darkMode ? styles.sectionIconDark : styles.sectionIcon} />
            <span style={darkMode ? styles.itemTextDark : styles.itemText}>Danh sách tạm ẩn</span>
          </TouchableOpacity>
        </div>
      </div>

      <div style={styles.toggleButton}>
        <button onClick={() => setDarkMode(!darkMode)} style={styles.button}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f1f1f1', // Light background
    minHeight: '100vh',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerDark: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#121212', // Dark background (Night mode)
    minHeight: '100vh',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#eaeaea', // Lighter text for night mode
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '20px 30px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px',
    width: '100%',
    maxWidth: '900px',
    transition: 'all 0.3s ease',
  },
  headerDark: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333', // Darker header background
    padding: '20px 30px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    marginBottom: '30px',
    width: '100%',
    maxWidth: '900px',
    transition: 'all 0.3s ease',
  },
  icons: {
    display: 'flex',
    gap: '25px',
  },
  icon: {
    fontSize: '28px',
    color: 'black', // Bright blue color for icons
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
  iconDark: {
    fontSize: '28px',
    color: '#eaeaea', // Light color for icons in dark mode
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  userImage: {
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    marginRight: '20px',
  },
  userName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333', // Normal text color
    margin: 0,
  },
  userNameDark: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#eaeaea', // Lighter text for dark mode
    margin: 0,
  },
  section: {
    width: '100%',
    maxWidth: '900px',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1c1c1c', // Blue color for section titles
    marginBottom: '15px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  sectionTitleDark: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff', // White color for section titles in dark mode
    marginBottom: '15px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  itemsContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  itemsContainerDark: {
    backgroundColor: '#444', // Darker background for items container
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  },
  item: {
    display: 'flex',
    flexDirection : "row",
    alignItems: 'center',
    marginBottom: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    backgroundColor: '#f8f9fa', // Lighter background color for items
    color: '#333', // Text color
    borderRadius: '8px',
    padding: '10px',
  },
  itemDark: {
    display: 'flex',
    flexDirection : "row",
    alignItems: 'center',
    marginBottom: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    backgroundColor: '#444', // Darker item background
    color: '#eaeaea', // Lighter text for items in dark mode
    borderRadius: '8px',
    padding: '10px',
  },
  sectionIcon: {
    fontSize: '24px',
    marginRight: '10px',
    color: '#007bff',
  },
  sectionIconDark: {
    fontSize: '24px',
    marginRight: '10px',
    color: '#fff',
  },
  itemText: {
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#333',
  },
  itemTextDark: {
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#eaeaea', // Lighter text for dark mode
  },
  toggleButton: {
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  loading: {
    fontSize: '24px',
    color: '#007bff',
  },
  loadingDark: {
    fontSize: '24px',
    color: '#eaeaea', // Lighter loading color in dark mode
  },
  error: {
    fontSize: '24px',
    color: '#f44336', // Red color for error
  },
  errorDark: {
    fontSize: '24px',
    color: '#f44336', // Red color for error in dark mode
  },
};

export default UserScreen;
