/* eslint-disable prettier/prettier */
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LandingScreen from '../src/screens/PatientSceens/LandingScreen';
import ConsultationScreen from '../src/screens/PatientSceens/ConsultationScreen';
import ShowConsultationScreen from '../src/screens/PatientSceens/ShowConsultationScreen';
import AppointmentScreen from '../src/screens/PatientSceens/AppointmentScreen';
import HealthDataScreen from '../src/screens/PatientSceens/HealthDataScreen';
import PreviousConsultationScreen from '../src/screens/PatientSceens/PreviousConsultationScreen';
import MedicalImagePicker from '../src/screens/PatientSceens/MedicalImagePickerScreen';
import BookAppointmentScreen from '../src/screens/PatientSceens/BookAppointmentScreen';
import Notification from '../src/screens/PatientSceens/Notifications';

// Create stack navigator for the admin role
const Stack = createNativeStackNavigator();

const PatientNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/*Patient navigators */}
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="ConsultationScreen" component={ConsultationScreen} />
      <Stack.Screen
        name="ShowConsultationScreen"
        component={ShowConsultationScreen}
      />
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Stack.Screen
        name="BookAppointmentScreen"
        component={BookAppointmentScreen}
      />
      <Stack.Screen name="HealthDataScreen" component={HealthDataScreen} />
      <Stack.Screen
        name="PreviousConsultationScreen"
        component={PreviousConsultationScreen}
      />
      <Stack.Screen name="MedicalImagePicker" component={MedicalImagePicker} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default PatientNavigator;
