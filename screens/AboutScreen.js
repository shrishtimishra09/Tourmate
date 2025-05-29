import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutScreen() {
  return (
    <ImageBackground
      source={require('../assets/bggg.png')} 
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
        style={styles.overlay}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>✨ About TourMate ✨</Text>

          <Text style={styles.description}>
            TourMate is your luxurious travel assistant — crafted to help you effortlessly explore restaurants, hotels, and attractions around your location.{"\n\n"}
            Whether you're on a spontaneous weekend getaway or a grand adventure, TourMate brings you handpicked recommendations, real-time guidance, and elegant design — all in one place.
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>App Version</Text>
            <Text style={styles.value}>1.0.0</Text>

            <Text style={styles.label}>Developed by</Text>
            <Text style={styles.value}>The TourMate Team</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  container: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  description: {
    fontSize: 18,
    color: '#ffffff',
    lineHeight: 28,
    textAlign: 'justify',
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  label: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
});
