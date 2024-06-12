import React from 'react';
import {useAppState} from '../Context/ContextContainer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import BottomNavigation from './BottomNavigation';
import FullImageView from '../Components/FullImageView';

import UploadePrescription from '../Pages/Prescription/UploadePrescription';
import UploadeLabReport from '../Pages/LabReports/UploadeLabReport';

const MainContainer = () => {
  const {auth} = useAppState();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth ? (
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigation}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Bottom"
            component={BottomNavigation}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen name="FullImageView" component={FullImageView} />
        <Stack.Screen
          name="UploadePrescription"
          component={UploadePrescription}
        />
        <Stack.Screen name="UploadeLabReport" component={UploadeLabReport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
