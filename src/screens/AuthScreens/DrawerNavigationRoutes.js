

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import LandingScreen from '../PatientSceens/LandingScreen';
import SettingsScreen from './SettingsScreen';
import CustomSidebarMenu from '../../components/CustomSidebarMenu';
import NavigationDrawerHeader from '../../components/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const LandingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="LandingScreen">
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{
          title: 'Landing', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#fff', //Set Header color
          },
          headerTintColor: '#172A48', //Set Header text color
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const SettingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#fff', //Set Header color
        },
        headerTintColor: '#FA5075', //Set Header text color
        headerTitleStyle: {
          fontFamily: 'Poppins-Regular', //Set Header text family
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#FA5075',
        
        drawerItemStyle: {marginVertical: 5},
        drawerLabelStyle: {
          color: '#172A48',
          fontFamily: 'Poppins-Regular'
        },
        headerShown: false
      }}
     
      drawerContent={CustomSidebarMenu}>

      <Drawer.Screen
        name="LandingScreenStack"
        options={{drawerLabel: 'Landing Screen'}}
        component={LandingScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{drawerLabel: 'Setting Screen'}}
        component={SettingScreenStack}
      />


    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;