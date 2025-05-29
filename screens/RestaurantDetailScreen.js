import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, ActivityIndicator, StyleSheet, Button, Linking } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Import star icon

const RestaurantDetailScreen = ({ route }) => {
  const { placeId } = route.params; // Retrieve place ID from navigation parameters
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRestaurantDetails(placeId);
  }, [placeId]);

  // Fetch detailed information for the restaurant
  const fetchRestaurantDetails = async (id) => {
    try {
      const apiKey = 'AIzaSyDfa3NVsBgI4_HK-bZG6i-AcA2GtHYl83U'; // Replace with your actual API key
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,formatted_address,formatted_phone_number,opening_hours,rating,photos,types,geometry&key=${apiKey}`
      );
      
      if (response.data.result) {
        setRestaurantDetails(response.data.result);
      } else {
        setError('Details not found');
      }
    } catch (err) {
      setError('Error fetching details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to open Street View
  const openStreetView = () => {
    if (restaurantDetails?.geometry) {
      const { lat, lng } = restaurantDetails.geometry.location;
      const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;
      Linking.openURL(streetViewUrl);
    } else {
      alert('Location coordinates not available');
    }
  };

  // Loading indicator
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Error handling
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/rest.png')} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        {restaurantDetails && (
          <>
            {/* Display restaurant image */}
            {restaurantDetails.photos && restaurantDetails.photos.length > 0 ? (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurantDetails.photos[0].photo_reference}&key=AIzaSyDfa3NVsBgI4_HK-bZG6i-AcA2GtHYl83U`,
                }}
                style={styles.image}
              />
            ) : (
              <Text style={styles.noImageText}>No image available</Text>
            )}

            {/* Display restaurant name with rating in heart container */}
            <View style={styles.nameRatingContainer}>
              <Text style={styles.name}>{restaurantDetails.name}</Text>
              {restaurantDetails.rating && (
                <View style={styles.heartContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.rating}>{restaurantDetails.rating}</Text>
                </View>
              )}
            </View>

            {/* Display phone number */}
            {restaurantDetails.formatted_phone_number ? (
              <Text style={styles.phone}>Phone: {restaurantDetails.formatted_phone_number}</Text>
            ) : (
              <Text style={styles.phone}>Phone number not available</Text>
            )}

            {/* Display cuisine or types */}
            {restaurantDetails.types ? (
              <Text style={styles.cuisine}>
                Cuisine: {restaurantDetails.types.join(', ')}
              </Text>
            ) : (
              <Text style={styles.cuisine}>Cuisine information not available</Text>
            )}

            {/* Address container */}
            <View style={styles.addressContainer}>
              <Text style={styles.addressTitle}>Address:</Text>
              <Text style={styles.address}>{restaurantDetails.formatted_address}</Text>
            </View>

            {/* Display opening hours */}
            {restaurantDetails.opening_hours ? (
              <Text style={styles.hours}>
                {restaurantDetails.opening_hours.open_now ? 'Open Now' : 'Closed'}
              </Text>
            ) : (
              <Text style={styles.hours}>Hours not available</Text>
            )}

            {/* Street View Button */}
            <View style={styles.streetViewButtonContainer}>
              <Button title="Street View" onPress={openStreetView} color="#6C91BF" />
            </View>
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent', // Make the container transparent to show the background
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjust to cover the entire screen
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  noImageText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  nameRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  heartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C91BF', // Heart color
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  rating: {
    fontSize: 20,
    marginLeft: 5,
    color: '#fff',
  },
  phone: {
    fontSize: 18,
    fontWeight: 'bold', // Bold font for contact number
    marginTop: 8,
  },
  cuisine: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  addressContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
  },
  hours: {
    fontSize: 25,
    marginTop: 5,
    color: 'green',
  },
  streetViewButtonContainer: {
    marginTop: 15,
  },
});

export default RestaurantDetailScreen;
