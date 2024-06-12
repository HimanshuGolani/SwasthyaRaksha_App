import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Login/Signup';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: '#000'},
        tabBarIconStyle: {display: 'none'},
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 17,
          padding: 7,
          textAlign: 'center',
          textDecorationColor: 'wheat',
        },
        headerShown: false,
      }}>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Signup" component={Signup} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
