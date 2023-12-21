/* eslint-disable prettier/prettier */
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DocConsultationScreen from '../src/screens/DoctorScreens/ConsultationScreen';
import DocShowConsultationScreen from '../src/screens/DoctorScreens/ShowConsultationScreen';
import DocAppointmentScreen from '../src/screens/DoctorScreens/AppointmentScreen';
import DocHealthDataScreen from '../src/screens/DoctorScreens/HealthDataScreen';
import DocPreviousConsultationScreen from '../src/screens/DoctorScreens/PreviousConsultationScreen';
import DocLandingScreen from '../src/screens/DoctorScreens/LandingScreen';

const Stack = createNativeStackNavigator();

const DoctorNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/*Doctor navigators */}
      <Stack.Screen name="DocLandingScreen" component={DocLandingScreen} />
      <Stack.Screen
        name="DocConsultationScreen"
        component={DocConsultationScreen}
      />
      <Stack.Screen
        name="DocShowConsultationScreen"
        component={DocShowConsultationScreen}
      />
      <Stack.Screen
        name="DocAppointmentScreen"
        component={DocAppointmentScreen}
      />
      <Stack.Screen
        name="DocHealthDataScreen"
        component={DocHealthDataScreen}
      />
      <Stack.Screen
        name="DocPreviousConsultationScreen"
        component={DocPreviousConsultationScreen}
      />
    </Stack.Navigator>
  );
};

export default DoctorNavigator;
