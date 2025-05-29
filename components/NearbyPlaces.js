import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button } from 'react-native';

const NearbyPlaces = ({ latitude, longitude }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNearbyPlaces = async (type) => {
    setLoading(true);
    try {
      const apiKey = process.env.GOOGLE_API_KEY; // Use your API key here
      const radius = 5000; // Radius in meters (5 km)
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setPlaces(data.results);
    } catch (error) {
      setError('Failed to fetch places');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Button title="Fetch Restaurants" onPress={() => fetchNearbyPlaces('restaurant')} />
      <Button title="Fetch Hotels" onPress={() => fetchNearbyPlaces('lodging')} />
      <Button title="Fetch Attractions" onPress={() => fetchNearbyPlaces('tourist_attraction')} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.vicinity}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default NearbyPlaces;
