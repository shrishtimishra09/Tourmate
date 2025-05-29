import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, ActivityIndicator, StyleSheet, Button, Linking } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Import star icon

const HotelDetailScreen = ({ route }) => {
  const { placeId } = route.params;
  const [hotelDetails, setHotelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotelDetails(placeId);
  }, [placeId]);

  const fetchHotelDetails = async (id) => {
    try {
      const apiKey = 'AIzaSyDfa3NVsBgI4_HK-bZG6i-AcA2GtHYl83U';
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,formatted_address,formatted_phone_number,opening_hours,rating,photos,types,geometry,website&key=${apiKey}`
      );

      if (response.data.result) {
        setHotelDetails(response.data.result);
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

  const openStreetView = () => {
    if (hotelDetails?.geometry) {
      const { lat, lng } = hotelDetails.geometry.location;
      const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;
      Linking.openURL(streetViewUrl);
    } else {
      alert('Location coordinates not available');
    }
  };

  const openWebsite = () => {
    if (hotelDetails?.website) {
      Linking.openURL(hotelDetails.website);
    } else {
      alert('Website not available');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
        {hotelDetails && (
          <>
            {hotelDetails.photos && hotelDetails.photos.length > 0 ? (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotelDetails.photos[0].photo_reference}&key=AIzaSyDfa3NVsBgI4_HK-bZG6i-AcA2GtHYl83U`,
                }}
                style={styles.image}
              />
            ) : (
              <Text style={styles.noImageText}>No image available</Text>
            )}

            <View style={styles.nameRatingContainer}>
              <Text style={styles.name}>{hotelDetails.name}</Text>
              {hotelDetails.rating && (
                <View style={styles.heartContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.rating}>{hotelDetails.rating}</Text>
                </View>
              )}
            </View>

            {hotelDetails.formatted_phone_number ? (
              <Text style={styles.phone}>Phone: {hotelDetails.formatted_phone_number}</Text>
            ) : (
              <Text style={styles.phone}>Phone number not available</Text>
            )}

            {hotelDetails.types ? (
              <Text style={styles.cuisine}>
                Type: {hotelDetails.types.join(', ')}
              </Text>
            ) : (
              <Text style={styles.cuisine}>Type information not available</Text>
            )}

            <View style={styles.addressContainer}>
              <Text style={styles.addressTitle}>Address:</Text>
              <Text style={styles.address}>{hotelDetails.formatted_address}</Text>
            </View>

            {hotelDetails.opening_hours ? (
              <Text style={styles.hours}>
                {hotelDetails.opening_hours.open_now ? 'Open Now' : 'Closed'}
              </Text>
            ) : (
              <Text style={styles.hours}>Hours not available</Text>
            )}

            {/* Street View Button */}
            <View style={styles.streetViewButtonContainer}>
              <Button title="Street View" onPress={openStreetView} color="#6C91BF" />
            </View>

            {/* Website Button */}
            <View style={styles.websiteButtonContainer}>
              <Button
                title="Visit Website"
                onPress={openWebsite}
                color="#4682B4"
              />
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
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
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
    backgroundColor: '#6C91BF',
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
    fontWeight: 'bold',
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
  websiteButtonContainer: {
    marginTop: 10,
  },
});

export default HotelDetailScreen;
