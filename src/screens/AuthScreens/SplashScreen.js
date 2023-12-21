/* eslint-disable prettier/prettier */
// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if AsyncStorage is set or not
      //If not then send for Authentication
      //else send to Home Screen

      AsyncStorage.getItem('user_id').then(value => {
        AsyncStorage.getItem('user_type').then(type => {
          console.log(
            'Someone is already connected id: ',
            value,
            ' type:',
            type,
          );

          if (value === null) navigation.replace('Onboarding');
        });

        console.log('Someone is already connected without logout? ', value);
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/LOGO.png')}
        style={{width: '50%', height: '50%', resizeMode: 'contain', margin: 60}}
      />

      <ActivityIndicator
        animating={animating}
        color="#28283A"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
