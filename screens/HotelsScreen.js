// screens/HotelsScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import axios from 'axios';

const HotelsScreen = ({ route, navigation }) => {
  const { location } = route.params;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiKey = 'AIzaSyDfa3NVsBgI4_HK-bZG6i-AcA2GtHYl83U'; 

  const fetchNearbyHotels = async (lat, lon) => {
    setLoading(true);
    try {
      const apiKey = 'AIzaSyDfa3NVsBgI4_HK-bZG6i-AcA2GtHYl83U'; 
      const radius = 7000;
      const type = 'lodging';

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&type=${type}&key=${apiKey}`
      );

      if (response.data.results) {
        setHotels(response.data.results);
      } else {
        setError('No hotels found nearby');
      }
    } catch (err) {
      setError('Error fetching data, please try again later');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      fetchNearbyHotels(latitude, longitude);
    }
  }, [location]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Button
          title="Try Again"
          onPress={() =>
            fetchNearbyHotels(location.latitude, location.longitude)
          }
        />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/rest.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Nearby Hotels</Text>
        <FlatList
          data={hotels}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {item.photos && item.photos[0] ? (
                <Image
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${apiKey}`,
                  }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={{
                    uri: 'https://via.placeholder.com/400x300.png?text=No+Image',
                  }}
                  style={styles.image}
                />
              )}
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.vicinity}</Text>
              <Button
                title="View Details"
                onPress={() =>
                  navigation.navigate('HotelDetail', {
                    placeId: item.place_id,
                  })
                }
              />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  item: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default HotelsScreen;
