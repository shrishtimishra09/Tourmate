import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

const RestaurantsScreen = ({ route, navigation }) => {
  const { location } = route.params; 
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fetchNearbyRestaurants = async (lat, lon) => {
    setLoading(true);
    try {
      const apiKey = 'AIzaSyDfa3NVsBgI4_HK-bZG6i-AcA2GtHYl83U';
      const radius = 7000; 
      const types = 'restaurant'; 

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&type=${types}&key=${apiKey}`
      );
      
      if (response.data.results) {
        setRestaurants(response.data.results);
      } else {
        setError('No restaurants found nearby');
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
      fetchNearbyRestaurants(latitude, longitude);
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
        <Button title="Try Again" onPress={() => fetchNearbyRestaurants(location.latitude, location.longitude)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.photos && item.photos[0] ? (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=AIzaSyDfa3NVsBgI4_HK-bZG6i-AcA2GtHYl83U`
                }}
                style={styles.image}
              />
            ) : (
              <Image
                source={{ uri: 'https://via.placeholder.com/400x300.png?text=No+Image' }}
                style={styles.image}
              />
            )}
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.vicinity}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('RestaurantDetail', { placeId: item.place_id })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
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

export default RestaurantsScreen;
