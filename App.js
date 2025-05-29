// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';

import RestaurantsScreen from './screens/RestaurantsScreen';
import HotelsScreen from './screens/HotelsScreen';
import AttractionsScreen from './screens/AttractionsScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import RestaurantDetailScreen from './screens/RestaurantDetailScreen'; 
import HotelDetailScreen from './screens/HotelDetailScreen';
import AttractionDetailScreen from './screens/AttractionDetailScreen';
import HomeScreen from './screens/HomeScreen'; 
import ProfileScreen from './screens/profilescreen';
import AboutScreen from './screens/AboutScreen';

const Stack = createStackNavigator();

const App = () => {
  const [location, setLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
        setPermissionGranted(true);
      } else {
        alert('Location permission denied');
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* Home screen with location and permission injected into route params */}
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              route={{
                ...props.route,
                params: {
                  ...(props.route.params || {}),
                  location,
                  permissionGranted
                }
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="ProfilePage" component={ProfileScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
        <Stack.Screen name="Hotels" component={HotelsScreen} />
        <Stack.Screen name="Attractions" component={AttractionsScreen} />

        <Stack.Screen
          name="RestaurantDetail"
          component={RestaurantDetailScreen}
          options={{ title: 'Restaurant Details' }}
        />
        <Stack.Screen
          name="HotelDetail"
          component={HotelDetailScreen}
          options={{ title: 'Hotel Details' }}
        />
        <Stack.Screen
          name="AttractionDetail"
          component={AttractionDetailScreen}
          options={{ title: 'Attraction Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
