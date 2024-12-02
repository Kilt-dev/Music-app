import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings, Bell, ScanLine, EyeOff, ShieldBan, CircleChevronUp, Wifi } from 'lucide-react'; // Import icons from Lucide
import { TouchableOpacity } from 'react-native';

const UserScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <img
            src={userData.image}
            alt="User"
            style={styles.userImage}
          />
          <h2 style={styles.userName}>
            {userData.firstName} {userData.lastName}
          </h2>
        </div>
        <div style={styles.icons}>
          <TouchableOpacity>
            <Bell style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Settings style={styles.icon} />
          </TouchableOpacity>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Dịch vụ</h3>
        <div style={styles.itemsContainer}>
          <TouchableOpacity style={styles.item}>
            <Wifi style={styles.sectionIcon} />
            <span style={styles.itemText}>Tiết kiệm 3G/4G truy cập</span>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <ScanLine style={styles.sectionIcon} />
            <span style={styles.itemText}>Nhập code</span>
          </TouchableOpacity>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Cá Nhân</h3>
        <div style={styles.itemsContainer}>
          <TouchableOpacity style={styles.item}>
            <CircleChevronUp style={styles.sectionIcon} />
            <span style={styles.itemText}>Danh sách quan tâm</span>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <ShieldBan style={styles.sectionIcon} />
            <span style={styles.itemText}>Danh sách chặn</span>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <EyeOff style={styles.sectionIcon} />
            <span style={styles.itemText}>Danh sách tạm ẩn</span>
          </TouchableOpacity>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#e6f7ff', // Light blue background
    minHeight: '100vh',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  icons: {
    display: 'flex',
    gap: '25px',
  },
  icon: {
    fontSize: '28px',
    color: '#007bff', // Blue color for icons
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
    color: '#333',
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
    color: '#007bff', // Blue color for section titles
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
  item: {
    display: 'flex',
    flexDirection : "row",
    alignItems: 'center',
    marginBottom: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  itemHover: {
    backgroundColor: '#f0f8ff', // Light blue hover effect
    transform: 'scale(1.02)',
  },
  sectionIcon: {
    fontSize: '24px',
    color: '#007bff', // Blue color for icons
    marginRight: '15px',
  },
  itemText: {
    fontSize: '18px',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#333',
  },
  error: {
    textAlign: 'center',
    fontSize: '20px',
    color: 'red',
  },
};

export default UserScreen;
