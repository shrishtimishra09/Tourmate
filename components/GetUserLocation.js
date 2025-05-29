import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

const GetUserLocation = ({ onLocationFetched }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get the user's location
      const location = await Location.getCurrentPositionAsync({});
      onLocationFetched(location.coords); // Pass the location coordinates to parent
    } catch (error) {
      setErrorMsg('Failed to fetch location');
    }
  };

  return (
    <View>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      <Button title="Get Location" onPress={getLocation} />
    </View>
  );
};

export default GetUserLocation;
