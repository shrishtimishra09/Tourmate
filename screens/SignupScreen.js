import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, RubikDirt_400Regular } from '@expo-google-fonts/rubik-dirt';
import * as SplashScreen from 'expo-splash-screen';
import { Image } from 'expo-image';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from './firebaseConfig'; 
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; 

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fontsLoaded] = useFonts({ RubikDirt_400Regular });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      // ✅ Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: serverTimestamp()
      });

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#0066ff', '#66b3ff']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/globe.png')} style={styles.globeImage} contentFit="cover" />
          <Text style={[styles.logoText, { fontFamily: 'RubikDirt_400Regular' }]}>TourMate</Text>
        </View>

        <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="#aaa" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor="#aaa" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Enter your password" placeholderTextColor="#aaa" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Confirm your password" placeholderTextColor="#aaa" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  innerContainer: {
    width: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    alignItems: 'center',
  },
  logoContainer: {
    width: 150,
    height: 160,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  globeImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  logoText: {
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 12,
    marginVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#005ce6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontSize: 18,
  },
});
