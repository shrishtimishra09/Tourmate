import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation, route }) => {
  const { location, permissionGranted, name, email } = route.params;

  const handleAbout = () => {
    Alert.alert(
      'About TourMate',
      'TourMate is your personal travel assistant that helps you discover nearby restaurants, hotels, and attractions based on your location.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <ImageBackground
      source={require('../assets/bggg.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.credentialsButton}
            onPress={() => navigation.navigate('ProfilePage', { name, email })}
          >
            <Ionicons name="person-circle-outline" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Hello, Mate!</Text>
        </View>

        {/* Category Buttons */}
        {permissionGranted && location ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Restaurants', { location })}
            >
              <Text style={styles.buttonText}>Restaurants</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Hotels', { location })}
            >
              <Text style={styles.buttonText}>Hotels</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Attractions', { location })}
            >
              <Text style={styles.buttonText}>Attractions</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.permissionText}>
            Location permission not granted
          </Text>
        )}

        {/* About Button at the Bottom */}
        <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('About')}>
  <Text style={styles.aboutButtonText}>About</Text>
</TouchableOpacity>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 18,
    backgroundColor: 'transparent',
  },
  header: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  credentialsButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '70%',
    marginTop: 200,
  },
  button: {
    backgroundColor: '#708B75',
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 18,
    color: '#D9534F',
    textAlign: 'center',
    marginTop: 20,
  },
  aboutContainer: {
    marginBottom: 10,
  },
  aboutButton: {
  position: 'absolute',
  bottom: 50,
  alignSelf: "centre",
  backgroundColor: '#4B6584',
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 25,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 5,
},

  aboutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
