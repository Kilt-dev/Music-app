import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Disc3, User, UserPlus } from 'lucide-react-native'; // Ensure correct import of icons

const SplashScreen = ({navigation}) => {
 
  return (
    <ImageBackground 
      source={require('../assets/bgLogin.jpg')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.container}>
        
        <View style={styles.logoContainer}>
          <Disc3 size={100} color="#F179B8" /> 
          <Text style={styles.appName}>Music Luci</Text>
        </View>

        {/* Create an Account Button */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          <UserPlus size={24} color="#F179B8" />
          <Text style={styles.buttonText}>Create an account</Text>
        </TouchableOpacity>

        {/* Already have an account Button */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Login')}
        >
          <User size={24} color="#F179B8" />
          <Text style={styles.buttonText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DBDFEB',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#956AD6',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#DBDFEB',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default SplashScreen;
