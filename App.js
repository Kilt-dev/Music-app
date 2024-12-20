import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  // Để sử dụng các icon cho tab

// Các màn hình của bạn
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import SplashScreen from './Screens/SplashScreen';
import LibraryScreen from './Screens/LibraryScreen';
import PlaySongScreen from './Screens/PlaySongScreen';
import { Anchor } from 'lucide-react-native';
import UserScreen from './Screens/UserScreen';
import DSChan from './Screens/individual/DSChan';
import DSQuanTam from './Screens/individual/DSQuanTam';
import DSTamAn from './Screens/individual/DSTamAn';
import Off from './Screens/LIB/Off';
import YeuThich from './Screens/LIB/YeuThich';
import DaTai from './Screens/LIB/DaTai';
import MV from './Screens/LIB/MV';
import Upload from './Screens/LIB/Upload';
import { Provider as PaperProvider } from 'react-native-paper'; 
import NgheSi from './Screens/LIB/NgheSi';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
  initialRouteName="Home"
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      // Đặt tên biểu tượng tùy thuộc vào tên route
      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Library') {
        iconName = focused ? 'library' : 'library-outline';
      } else if (route.name === 'PlaySong') {
        iconName = focused ? 'musical-notes' : 'musical-notes-outline';
      }else if (route.name === 'User') {
        iconName = focused ? 'person-circle' : 'person-circle-outline';
      }

      // Trả về icon với kích thước và màu sắc
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Library" component={LibraryScreen} />
    <Tab.Screen name="PlaySong" component={PlaySongScreen} />
    <Tab.Screen name="User" component={UserScreen} />
    
  </Tab.Navigator>
);

// Tạo Stack Navigator cho các màn hình điều hướng đầu tiên
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name ="TabNavigator" component={TabNavigator}/>
        <Stack.Screen name="Register" component={RegisterScreen} />
        {/* <Stack.Screen name="User" component={UserScreen} /> */}
        <Stack.Screen name="DSChan" component={DSChan} />
        <Stack.Screen name="DSQuanTam" component={DSQuanTam} />
        <Stack.Screen name="DSTamAn" component={DSTamAn} />
        <Stack.Screen name="MV" component={MV} />
        <Stack.Screen name="DaTai" component={DaTai} />
        <Stack.Screen name="YeuThich" component={YeuThich} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Off" component={Off} />
        <Stack.Screen name="NgheSi" component={NgheSi} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
