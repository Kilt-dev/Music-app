import AsyncStorage from "@react-native-async-storage/async-storage";

// Hàm lấy danh sách người dùng
export const getAllUsers = async () => {
  try {
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách người dùng');
    }
    const data = await response.json();
    return data.users; // Trả về danh sách người dùng
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Hàm đăng nhập để lấy Access Token
export const login = async (username, password) => {
    try {
      // Gửi yêu cầu đăng nhập để lấy Access Token
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
           
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi: ${errorText}`);
      }
  
      const data = await response.json();
      const accessToken = data.accessToken; // Giả sử API trả về accessToken
  
      if (!accessToken) {
        throw new Error('Không có Access Token');
      }
  
      // In Access Token ra console
      console.log("Access Token: ", accessToken);
  
      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem('accessToken', accessToken);
  
      return accessToken;
  
    } catch (error) {
      console.error('Lỗi đăng nhập:', error.message);
      throw error;
    }
  };
  

// Hàm lấy dữ liệu người dùng sử dụng Access Token
export const fetchUserData = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken'); // Lấy token từ AsyncStorage
  
    if (!accessToken) {
      throw new Error('Access Token không có');
    }
  
    try {
      const response = await fetch('https://dummyjson.com/auth/me', { // Sử dụng đúng endpoint
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Gửi Access Token trong header
         
        },
      }.then(response => response.json())
    .then(console.log));
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi lấy dữ liệu người dùng: ${errorText}`);
      }
  
      const userData = await response.json();
      return userData;
     
      
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error.message);
      throw error;
    }
  }
  
  
