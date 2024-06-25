import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../Pages/Home/Home';
import Prescription from '../Pages/Prescription/Prescriptions';
import LabReports from '../Pages/LabReports/LabReports';
import {useAppState} from '../Context/ContextContainer';
import SearchUser from '../Pages/Search/SearchUser';
import SearchForAccess from '../Pages/Search/SearchForAccess';
import Profile from '../Pages/Profile/Profile';
import Logout from '../Components/Logout';
import AppointmentReminder from '../Pages/Appointment/AppointmentReminder';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const {role} = useAppState();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000', // Background color of the drawer
        },
        drawerContentStyle: {
          flex: 1,
          backgroundColor: '#000', // Background color of the drawer content
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        },
        drawerLabelStyle: {
          borderBottomColor: 'white',
          borderBottomWidth: 2,
          textAlign: 'center',
          marginBottom: 1,
          fontSize: 24,
          fontWeight: 'bold',
          color: '#38a169',
        },
        // headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Prescription" component={Prescription} />
      <Drawer.Screen name="LabReports" component={LabReports} />
      <Drawer.Screen name="Appointments" component={AppointmentReminder} />

      {role === 'Normal-User' ? (
        <>
          <Drawer.Screen name="Share Docs" component={SearchForAccess} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Search Users" component={SearchUser} />
          <Drawer.Screen name="Share Access" component={SearchForAccess} />
        </>
      )}
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
