/* eslint-disable prettier/prettier */

// Import React
import React, {useEffect, useState} from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens

import LandingScreen from './LandingScreen';
import Notification from './Notifications';
import SettingsScreen from './SettingScreen';
import ProfileScreen from './ProfileScreen';

import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Iconicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ChaperoneScreen from './ChaperoneScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NotificationTabIcon = ({focused, notificationCount}) => {
  let iconName = focused ? 'notifications' : 'notifications-outline';

  return (
    <View>
      <Iconicons name={iconName} size={24} color="#28283A" />
      {notificationCount > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -6,
            right: -10,
            backgroundColor: '#FF8C98',
            borderRadius: 10,
            paddingHorizontal: 6,
            paddingVertical: 2,
          }}>
          <Text style={{color: 'white', fontSize: 10}}>
            {notificationCount}
          </Text>
        </View>
      )}
    </View>
  );
};

const LandingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff', //Set Header color
        },
        headerTintColor: '#172A48', //Set Header text color
        headerTitleStyle: {
          fontFamily: 'Poppins-Regular', //Set Header text family
        },
      }}
      initialRouteName="LandingScreen">
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{
          title: 'Accueil', //Set Header Title
          headerStyle: {
            backgroundColor: '#fff', //Set Header color
          },
          headerTintColor: '#172A48', //Set Header text color
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular', //Set Header text style
          },
        }}
      />

      <Stack.Screen
        name="ChaperoneScreen"
        component={ChaperoneScreen}
        options={{
          title: 'Chaperone',
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
        headerStyle: {
          backgroundColor: '#fff', //Set Header color
        },
        headerTintColor: '#172A48', //Set Header text color
        headerTitleStyle: {
          fontFamily: 'Poppins-Regular', //Set Header text family
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Paramètres', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff', //Set Header color
        },
        headerTintColor: '#172A48', //Set Header text color
        headerTitleStyle: {
          fontFamily: 'Poppins-Regular', //Set Header text family
        },
      }}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profil', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};
const NotificationScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Notification"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff', //Set Header color
        },
        headerTintColor: '#172A48', //Set Header text color
        headerTitleStyle: {
          fontFamily: 'Poppins-Regular', //Set Header text family
        },
      }}>
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          title: 'Notifications', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DoctorRootNavigation = props => {
  const [countNotification, setCountNotification] = useState(0);

  useEffect(() => {
    setCountNotification(AsyncStorage.getItem('notification'));
    //console.log('count notif', countNotification);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Notification') {
            // Pass the notification count as a prop to the custom icon component
            return (
              <NotificationTabIcon
                focused={focused}
                notificationCount={countNotification} // Replace with your actual notification count
              />
            );
          }
          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Landing') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Iconicons name={iconName} size={24} color="#28283A" />;
        },
        tabBarLabel: () => null, // This removes the tab labels
        activeTintColor: '#28283A',
        inactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Landing" component={LandingScreenStack} />
      <Tab.Screen name="Profile" component={ProfileScreenStack} />
      <Tab.Screen name="Settings" component={SettingScreenStack} />
      <Tab.Screen name="Notification" component={NotificationScreenStack} />
    </Tab.Navigator>
  );
};
export default DoctorRootNavigation;
