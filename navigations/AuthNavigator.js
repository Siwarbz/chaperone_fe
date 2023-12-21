/* eslint-disable prettier/prettier */
import React, {useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Onboarding from '../src/screens/AuthScreens/Onboarding';
import SplashScreen from '../src/screens/AuthScreens/SplashScreen';
import LoginScreen from '../src/screens/AuthScreens/LoginScreen';
import RegisterScreen from '../src/screens/AuthScreens/RegisterScreen';
import VerificationScreen from '../src/screens/AuthScreens/VerificationScreen';
import ForgotPasswordScreen from '../src/screens/AuthScreens/ForgotPasswordScreen';
import ResetCodeScreen from '../src/screens/AuthScreens/ResetCodeScreen';
import ResetPasswordScreen from '../src/screens/AuthScreens/ResetPasswordScreen';
import SuccessScreen from '../src/screens/AuthScreens/SucessScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const [resetPasswordScreenState, setResetPasswordScreenState] =
    useState(null);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={
        resetPasswordScreenState ? 'ResetPasswordScreen' : 'SplashScreen'
      }>
      {/*Authentification navigators */}

      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="ResetCodeScreen" component={ResetCodeScreen} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{unmountOnBlur: false}}
        initialParams={{
          persistedState: resetPasswordScreenState,
          setPersistedState: newState => setResetPasswordScreenState(newState),
        }}
      />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
