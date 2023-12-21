/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Linking, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigations/AuthNavigator';
import AdminRootNavigation from './src/screens/AdminScreens/AdminRootNavigation';
import PatientRootNavigation from './src/screens/PatientSceens/PatientRootNavigation';
import DoctorRootNavigation from './src/screens/DoctorScreens/DoctorRootNavigation';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/store/index';
import {Init} from './src/store/actions';
import {useNavigation} from '@react-navigation/native';
import * as RootNavigation from './RootNavigation';

import {ScreenProvider} from './screenProvider';
import {useScreen} from './screenProvider';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//
import Onboarding from './src/screens/AuthScreens/Onboarding';
import SplashScreen from './src/screens/AuthScreens/SplashScreen';
import LoginScreen from './src/screens/AuthScreens/LoginScreen';
import RegisterScreen from './src/screens/AuthScreens/RegisterScreen';
import VerificationScreen from './src/screens/AuthScreens/VerificationScreen';
import ForgotPasswordScreen from './src/screens/AuthScreens/ForgotPasswordScreen';
import ResetCodeScreen from './src/screens/AuthScreens/ResetCodeScreen';
import ResetPasswordScreen from './src/screens/AuthScreens/ResetPasswordScreen';
import SuccessScreen from './src/screens/AuthScreens/SucessScreen';

const Stack = createNativeStackNavigator();
//const Stack = createStackNavigator();
const RootsNavigation = () => {
  const linking = {
    prefixes: ['chaperone://'],
    // Route config to map uri paths to screens
    config: {
      // Initial route name to be added to the stack before any further navigation,
      // should match one of the available screens
      initialRouteName: 'ResetPasswordScreen',
      screens: {
        // myapp://home -> HomeScreen
        ResetPasswordScreen: 'reset-password',
        // myapp://details/1 -> DetailsScreen with param id: 1
        LoginScreen: 'login',
      },
    },
  };
  const user_id = useSelector(state => state.Reducers.auth_user_id);
  console.log(user_id);
  const user_type = useSelector(state => state.Reducers.auth_user_type);
  console.log(user_type);
  const dispatch = useDispatch();
  const {setCurrentScreen} = useScreen();

  const [loading, setLoading] = useState(true);
  const [isDeepLinkDetected, setIsDeepLinkDetected] = useState(false); // State to track the presence of deep link
  const init = async () => {
    await dispatch(Init());
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log(isDeepLinkDetected);
  }, [isDeepLinkDetected]);
  /*
  useEffect(() => {
    // Get the deep link used to open the app
    const getUrl = async () => {
      const initialUrl = await Linking.getInitialURL();

      if (initialUrl.includes('reset-password')) {
        console.log('deep linking 2');
        Alert.alert(initialUrl);
        setIsDeepLinkDetected(true);
        /*
        const searchParams = initialUrl.searchParams;
        const token = searchParams.get('token');
        const userID = searchParams.get('id');
        RootNavigation.navigate('ResetPasswordScreen');
      }
    };
    console.log('deep', isDeepLinkDetected);
    getUrl();
  }, [isDeepLinkDetected]);*/
  return (
    <NavigationContainer linking={linking} ref={RootNavigation.navigationRef}>
      {user_id === null ? (
        <AuthNavigator />
      ) : user_type === 'patient' ? (
        <PatientRootNavigation />
      ) : user_type === 'doctor' ? (
        <DoctorRootNavigation />
      ) : user_type === 'admin' ? (
        <AdminRootNavigation />
      ) : null}
    </NavigationContainer>
  );
};
export default function App() {
  return (
    <Provider store={store}>
      <ScreenProvider>
        <RootsNavigation />
      </ScreenProvider>
    </Provider>
  );
}
